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
import { ContractService } from './Contract.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Contract',
	templateUrl: './Contract.component.html',
	styleUrls: ['./Contract.component.css'],
  providers: [ContractService]
})
export class ContractComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          contractId = new FormControl("", Validators.required);
        
  
      
          renter = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  
      
          lot = new FormControl("", Validators.required);
        
  
      
          consignment = new FormControl("", Validators.required);
        
  
      
          arrivalDateTime = new FormControl("", Validators.required);
        
  
      
          numHours = new FormControl("", Validators.required);
        
  


  constructor(private serviceContract:ContractService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          contractId:this.contractId,
        
    
        
          renter:this.renter,
        
    
        
          owner:this.owner,
        
    
        
          lot:this.lot,
        
    
        
          consignment:this.consignment,
        
    
        
          arrivalDateTime:this.arrivalDateTime,
        
    
        
          numHours:this.numHours
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceContract.getAll()
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
      $class: "org.synahive.fluidspace.Contract",
      
        
          "contractId":this.contractId.value,
        
      
        
          "renter":this.renter.value,
        
      
        
          "owner":this.owner.value,
        
      
        
          "lot":this.lot.value,
        
      
        
          "consignment":this.consignment.value,
        
      
        
          "arrivalDateTime":this.arrivalDateTime.value,
        
      
        
          "numHours":this.numHours.value
        
      
    };

    this.myForm.setValue({
      
        
          "contractId":null,
        
      
        
          "renter":null,
        
      
        
          "owner":null,
        
      
        
          "lot":null,
        
      
        
          "consignment":null,
        
      
        
          "arrivalDateTime":null,
        
      
        
          "numHours":null
        
      
    });

    return this.serviceContract.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "contractId":null,
        
      
        
          "renter":null,
        
      
        
          "owner":null,
        
      
        
          "lot":null,
        
      
        
          "consignment":null,
        
      
        
          "arrivalDateTime":null,
        
      
        
          "numHours":null 
        
      
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
      $class: "org.synahive.fluidspace.Contract",
      
        
          
        
    
        
          
            "renter":this.renter.value,
          
        
    
        
          
            "owner":this.owner.value,
          
        
    
        
          
            "lot":this.lot.value,
          
        
    
        
          
            "consignment":this.consignment.value,
          
        
    
        
          
            "arrivalDateTime":this.arrivalDateTime.value,
          
        
    
        
          
            "numHours":this.numHours.value
          
        
    
    };

    return this.serviceContract.updateAsset(form.get("contractId").value,this.asset)
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

    return this.serviceContract.deleteAsset(this.currentId)
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

    return this.serviceContract.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "contractId":null,
          
        
          
            "renter":null,
          
        
          
            "owner":null,
          
        
          
            "lot":null,
          
        
          
            "consignment":null,
          
        
          
            "arrivalDateTime":null,
          
        
          
            "numHours":null 
          
        
      };



      
        if(result.contractId){
          
            formObject.contractId = result.contractId;
          
        }else{
          formObject.contractId = null;
        }
      
        if(result.renter){
          
            formObject.renter = result.renter;
          
        }else{
          formObject.renter = null;
        }
      
        if(result.owner){
          
            formObject.owner = result.owner;
          
        }else{
          formObject.owner = null;
        }
      
        if(result.lot){
          
            formObject.lot = result.lot;
          
        }else{
          formObject.lot = null;
        }
      
        if(result.consignment){
          
            formObject.consignment = result.consignment;
          
        }else{
          formObject.consignment = null;
        }
      
        if(result.arrivalDateTime){
          
            formObject.arrivalDateTime = result.arrivalDateTime;
          
        }else{
          formObject.arrivalDateTime = null;
        }
      
        if(result.numHours){
          
            formObject.numHours = result.numHours;
          
        }else{
          formObject.numHours = null;
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
      
        
          "contractId":null,
        
      
        
          "renter":null,
        
      
        
          "owner":null,
        
      
        
          "lot":null,
        
      
        
          "consignment":null,
        
      
        
          "arrivalDateTime":null,
        
      
        
          "numHours":null 
        
      
      });
  }

}
