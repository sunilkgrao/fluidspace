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
import { ConsignmentService } from './Consignment.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Consignment',
	templateUrl: './Consignment.component.html',
	styleUrls: ['./Consignment.component.css'],
  providers: [ConsignmentService]
})
export class ConsignmentComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          consignmentId = new FormControl("", Validators.required);
        
  
      
          lotSizeNeeded = new FormControl("", Validators.required);
        
  
      
          goodsType = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  


  constructor(private serviceConsignment:ConsignmentService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          consignmentId:this.consignmentId,
        
    
        
          lotSizeNeeded:this.lotSizeNeeded,
        
    
        
          goodsType:this.goodsType,
        
    
        
          owner:this.owner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceConsignment.getAll()
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
      $class: "org.synahive.fluidspace.Consignment",
      
        
          "consignmentId":this.consignmentId.value,
        
      
        
          "lotSizeNeeded":this.lotSizeNeeded.value,
        
      
        
          "goodsType":this.goodsType.value,
        
      
        
          "owner":this.owner.value
        
      
    };

    this.myForm.setValue({
      
        
          "consignmentId":null,
        
      
        
          "lotSizeNeeded":null,
        
      
        
          "goodsType":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceConsignment.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "consignmentId":null,
        
      
        
          "lotSizeNeeded":null,
        
      
        
          "goodsType":null,
        
      
        
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
      $class: "org.synahive.fluidspace.Consignment",
      
        
          
        
    
        
          
            "lotSizeNeeded":this.lotSizeNeeded.value,
          
        
    
        
          
            "goodsType":this.goodsType.value,
          
        
    
        
          
            "owner":this.owner.value
          
        
    
    };

    return this.serviceConsignment.updateAsset(form.get("consignmentId").value,this.asset)
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

    return this.serviceConsignment.deleteAsset(this.currentId)
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

    return this.serviceConsignment.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "consignmentId":null,
          
        
          
            "lotSizeNeeded":null,
          
        
          
            "goodsType":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.consignmentId){
          
            formObject.consignmentId = result.consignmentId;
          
        }else{
          formObject.consignmentId = null;
        }
      
        if(result.lotSizeNeeded){
          
            formObject.lotSizeNeeded = result.lotSizeNeeded;
          
        }else{
          formObject.lotSizeNeeded = null;
        }
      
        if(result.goodsType){
          
            formObject.goodsType = result.goodsType;
          
        }else{
          formObject.goodsType = null;
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
      
        
          "consignmentId":null,
        
      
        
          "lotSizeNeeded":null,
        
      
        
          "goodsType":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
