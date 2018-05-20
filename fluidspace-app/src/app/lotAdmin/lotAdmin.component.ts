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
import { lotAdminService } from './lotAdmin.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-lotAdmin',
	templateUrl: './lotAdmin.component.html',
	styleUrls: ['./lotAdmin.component.css'],
  providers: [lotAdminService]
})
export class lotAdminComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          authorized = new FormControl("", Validators.required);
        
  
      
          userId = new FormControl("", Validators.required);
        
  
      
          companyName = new FormControl("", Validators.required);
        
  
      
          contactDetails = new FormControl("", Validators.required);
        
  


  constructor(private servicelotAdmin:lotAdminService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          authorized:this.authorized,
        
    
        
          userId:this.userId,
        
    
        
          companyName:this.companyName,
        
    
        
          contactDetails:this.contactDetails
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.servicelotAdmin.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
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
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.synahive.fluidspace.lotAdmin",
      
        
          "authorized":this.authorized.value,
        
      
        
          "userId":this.userId.value,
        
      
        
          "companyName":this.companyName.value,
        
      
        
          "contactDetails":this.contactDetails.value
        
      
    };

    this.myForm.setValue({
      
        
          "authorized":null,
        
      
        
          "userId":null,
        
      
        
          "companyName":null,
        
      
        
          "contactDetails":null
        
      
    });

    return this.servicelotAdmin.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "authorized":null,
        
      
        
          "userId":null,
        
      
        
          "companyName":null,
        
      
        
          "contactDetails":null 
        
      
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.synahive.fluidspace.lotAdmin",
      
        
          
            "authorized":this.authorized.value,
          
        
    
        
          
        
    
        
          
            "companyName":this.companyName.value,
          
        
    
        
          
            "contactDetails":this.contactDetails.value
          
        
    
    };

    return this.servicelotAdmin.updateParticipant(form.get("userId").value,this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.servicelotAdmin.deleteParticipant(this.currentId)
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

    return this.servicelotAdmin.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "authorized":null,
          
        
          
            "userId":null,
          
        
          
            "companyName":null,
          
        
          
            "contactDetails":null 
          
        
      };



      
        if(result.authorized){
          
            formObject.authorized = result.authorized;
          
        }else{
          formObject.authorized = null;
        }
      
        if(result.userId){
          
            formObject.userId = result.userId;
          
        }else{
          formObject.userId = null;
        }
      
        if(result.companyName){
          
            formObject.companyName = result.companyName;
          
        }else{
          formObject.companyName = null;
        }
      
        if(result.contactDetails){
          
            formObject.contactDetails = result.contactDetails;
          
        }else{
          formObject.contactDetails = null;
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
      
        
          "authorized":null,
        
      
        
          "userId":null,
        
      
        
          "companyName":null,
        
      
        
          "contactDetails":null 
        
      
      });
  }

}
