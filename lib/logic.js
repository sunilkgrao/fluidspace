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

/**
 * Track the trade of a warehouselot from one owner to another
 * @param {org.synahive.fluidspace.Reserve} tx - the reservation to be processed
 * @transaction
 */
function reservewarehouselot(tx) {

    return getAssetRegistry('org.synahive.fluidspace.Contract')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.contract);
        });
}
