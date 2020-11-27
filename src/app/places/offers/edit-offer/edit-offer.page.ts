import { Place } from './../../place.model';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from './../../places.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place: Place;
  form: FormGroup;
  constructor(private route: ActivatedRoute, private placeService: PlacesService, private navCtrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.place = this.placeService.getPlace(paramMap.get('placeId'));
      this.form = new FormGroup({
        title: new FormControl(this.place.title, { updateOn: 'blur', validators: [Validators.required] }),
        description: new FormControl(this.place.description, { updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)] }),
      });
    });
  }

  onConfirmEditting() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
  }

}