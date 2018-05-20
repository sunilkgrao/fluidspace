/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { warehouselotService } from './warehouselot.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-warehouselot',
	templateUrl: './warehouselot.component.html',
	styleUrls: ['./warehouselot.component.css'],
  providers: [warehouselotService]
})
export class warehouselotComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          warehouselotID = new FormControl("", Validators.required);
        
  
      
          address = new FormControl("", Validators.required);
        
  
      
          coordinates = new FormControl("", Validators.required);
        
  
      
          ratePerHour = new FormControl("", Validators.required);
        
  
      
          lotSize = new FormControl("", Validators.required);
        
  
      
          features = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  


  constructor(private servicewarehouselot:warehouselotService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          warehouselotID:this.warehouselotID,
        
    
        
          address:this.address,
        
    
        
          coordinates:this.coordinates,
        
    
        
          ratePerHour:this.ratePerHour,
        
    
        
          lotSize:this.lotSize,
        
    
        
          features:this.features,
        
    
        
          owner:this.owner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.servicewarehouselot.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.synahive.fluidspace.warehouselot",
      
        
          "warehouselotID":this.warehouselotID.value,
        
      
        
          "address":this.address.value,
        
      
        
          "coordinates":this.coordinates.value,
        
      
        
          "ratePerHour":this.ratePerHour.value,
        
      
        
          "lotSize":this.lotSize.value,
        
      
        
          "features":this.features.value,
        
      
        
          "owner":this.owner.value
        
      
    };

    this.myForm.setValue({
      
        
          "warehouselotID":null,
        
      
        
          "address":null,
        
      
        
          "coordinates":null,
        
      
        
          "ratePerHour":null,
        
      
        
          "lotSize":null,
        
      
        
          "features":null,
        
      
        
          "owner":null
        
      
    });

    return this.servicewarehouselot.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "warehouselotID":null,
        
      
        
          "address":null,
        
      
        
          "coordinates":null,
        
      
        
          "ratePerHour":null,
        
      
        
          "lotSize":null,
        
      
        
          "features":null,
        
      
        
          "owner":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.synahive.fluidspace.warehouselot",
      
        
          
        
    
        
          
            "address":this.address.value,
          
        
    
        
          
            "coordinates":this.coordinates.value,
          
        
    
        
          
            "ratePerHour":this.ratePerHour.value,
          
        
    
        
          
            "lotSize":this.lotSize.value,
          
        
    
        
          
            "features":this.features.value,
          
        
    
        
          
            "owner":this.owner.value
          
        
    
    };

    return this.servicewarehouselot.updateAsset(form.get("warehouselotID").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.servicewarehouselot.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.servicewarehouselot.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "warehouselotID":null,
          
        
          
            "address":null,
          
        
          
            "coordinates":null,
          
        
          
            "ratePerHour":null,
          
        
          
            "lotSize":null,
          
        
          
            "features":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.warehouselotID){
          
            formObject.warehouselotID = result.warehouselotID;
          
        }else{
          formObject.warehouselotID = null;
        }
      
        if(result.address){
          
            formObject.address = result.address;
          
        }else{
          formObject.address = null;
        }
      
        if(result.coordinates){
          
            formObject.coordinates = result.coordinates;
          
        }else{
          formObject.coordinates = null;
        }
      
        if(result.ratePerHour){
          
            formObject.ratePerHour = result.ratePerHour;
          
        }else{
          formObject.ratePerHour = null;
        }
      
        if(result.lotSize){
          
            formObject.lotSize = result.lotSize;
          
        }else{
          formObject.lotSize = null;
        }
      
        if(result.features){
          
            formObject.features = result.features;
          
        }else{
          formObject.features = null;
        }
      
        if(result.owner){
          
            formObject.owner = result.owner;
          
        }else{
          formObject.owner = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "warehouselotID":null,
        
      
        
          "address":null,
        
      
        
          "coordinates":null,
        
      
        
          "ratePerHour":null,
        
      
        
          "lotSize":null,
        
      
        
          "features":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
