<template >
               <ion-col v-if="info" >
                <div v-for="item in info.projects" v-bind:key='item.src'>
                  <ion-card>
        
                    <ion-card-header>
                      <ion-card-subtitle>{{item.tagline}}</ion-card-subtitle>
                      <ion-card-title >{{item.title}}</ion-card-title>
                            <!--TODO: DONE  -->
                           <ion-img v-bind:src= "'https://cmgt.hr.nl:8000/'+item.headerImage"></ion-img> 
                         </ion-card-header>
                    <ion-card-content>  
                      <ion-label>            
                          <ion-item >
                     <h2>   Developed by: {{item.author}} </h2>
                    
                        </ion-item>  
                        <ion-item >
                     <p>  {{item.description}} </p>
                    
                        </ion-item> 
                        <ion-list >
                        <ion-item >
               <p>          Created: {{item.dateCreated}} </p>
                        </ion-item>    <ion-item >
                   <p>       Last update: {{item.dateUpdated}} </p>
                        </ion-item>  
                       
                        </ion-list >
                        </ion-label>              
                    </ion-card-content>
                   
                  </ion-card>
                </div>
          </ion-col>


</template>

<script>


export default {
 
  name: "ProjectInfo",
  props: ["info"],


}


</script>

