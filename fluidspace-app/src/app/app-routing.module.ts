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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { ContractComponent } from './Contract/Contract.component';
import { warehouselotComponent } from './warehouselot/warehouselot.component';
import { ConsignmentComponent } from './Consignment/Consignment.component';


  import { lotUserComponent } from './lotUser/lotUser.component';
  import { lotAdminComponent } from './lotAdmin/lotAdmin.component';


  import { ReserveComponent } from './Reserve/Reserve.component';  
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Contract', component: ContractComponent},
    
		{ path: 'warehouselot', component: warehouselotComponent},
    
		{ path: 'Consignment', component: ConsignmentComponent},
    
    
      { path: 'lotUser', component: lotUserComponent},
      
      { path: 'lotAdmin', component: lotAdminComponent},
      
      
        { path: 'Reserve', component: ReserveComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
