import { Component, OnInit } from '@angular/core';
import { SlotService } from '../slot.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slot-selection',
  templateUrl: './slot-selection.component.html',
  styleUrl: './slot-selection.component.css'
})
export class SlotSelectionComponent implements OnInit {
  availableSlots: any[] = [];
  selectedSlots: string[] = [];
  numberOfSlots:Number=0;
  slots: any[]=[];
  alreadyExistFlag:boolean=true;

  constructor(private slotService: SlotService, private authService: AuthService, private router:Router) {}

  // ngOnInit() {
  //   const RegNo = this.authService.getRegNo();
  //   this.slotService.getAvailableSlots().subscribe(slots => {
      
  //     this.availableSlots = slots;
  //   });
    
  // }
  ngOnInit() {
    const RegNo = this.authService.getRegNo();

    // Call to get the number of booked slots for the user
    this.slotService.userslotinfo(RegNo).subscribe(
      (response) => {
        // Assuming response is the number of booked slots
        this.slots = response;
        if (this.slots.length!=0){
          this.alreadyExistFlag = !this.alreadyExistFlag;
        }
        console.log('pre booked slots:', this.slots);
      },
      (error) => {
        console.error('Error fetching user slot info:', error);
      }
    );

    // Call to get available slots
    this.slotService.getAvailableSlots().subscribe(slots => {
      this.availableSlots = slots;
    });
  }


  selectSlot(slotId: string) {
    if (this.selectedSlots.length < 2 && !this.selectedSlots.includes(slotId)) {
      this.selectedSlots.push(slotId);
    }
  }

  bookSlots() {
    const RegNo = this.authService.getRegNo();
    // alert(RegNo);
    console.log(this.selectedSlots);
   
    this.slotService.bookSlots(RegNo, this.selectedSlots).subscribe(response => {
      alert('Slots booked successfully!');
      
    });
    this.router.navigate(['/login']);
  }
  getSlotDetails(slotId: string) {
    
    return this.availableSlots.find(slot => slot._id === slotId);
  }
  toggleSlot(slotId: string) {
    const index = this.selectedSlots.indexOf(slotId);
  
    if (index === -1) {
      // If less than 2 slots are selected, allow adding the slot
      if (this.selectedSlots.length < 2) {
        this.selectedSlots.push(slotId);
      } else {
        alert('You can only select a maximum of 2 slots.');
      }
    } else {
      // Remove the slot if already selected (deselect)
      this.selectedSlots.splice(index, 1);
    }
  }
  
}