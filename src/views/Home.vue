<template>
<!-- @detected-condition fires when the connectivity status of the device changes -->
  <offline @detected-condition="handleConnectivityChange">
    <!-- Only renders when the device is online -->
    <div slot="online">
      <p>It looks like you're online! Here's all the things you can do...</p>

  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-title  >CMGT Showcase</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      Welcome to the CMGT showcase website
      <!-- <OnlineStatus/> -->
      <TagInfo v-bind:tags="tags"/>
      <ProjectSearch v-on:get-tag="getProjectInfo"/>
       <ClearInfo v-bind:info="info" v-on:clear-info="clearInfo"/>
      <ProjectInfo v-bind:info="info" />
     
    </ion-content>
  </div>
  </div>
<!-- Only renders when the device is offline -->
   <div slot="offline">
      <p>You appear to be offline, that's okay, we can still do things...</p>
      ...
    </div>
  </offline>
</template>

<script>
// import { db } from '../firebase';
import ProjectSearch from "../components/ProjectSearch";
import ProjectInfo from "../components/ProjectInfo";
import TagInfo from "../components/TagInfo";
import ClearInfo from "../components/ClearInfo";
import localforage from "localforage";
import offline from 'v-offline';
  
  
  


 export default {
   name: "home",
   components: { ProjectSearch, ProjectInfo, ClearInfo, TagInfo, offline }, //

   data() {

    return {
      info: [],
      tags: [],
      projects: [],
      
       
       }
   },

    created () {
    // fetch the data when the view is created and the data is
    // already being observed
    
    this.getAllProjectInfo()
    this.getTagInfo()  
  },
   methods: {
        
    handleConnectivityChange(status) {
          console.log(status);
        },

      async getAllProjectInfo() {
       const res = await fetch(`https://cmgt.hr.nl:8000/api/projects/`);
        
        if (res.status == 404) {
         this.showAlert();
       }
  
      this.info = await res.json();  

      var projectData = {
            projects: this.info.projects,
          };
      
      localforage.setItem('allProjects', projectData).then(function (projectData) {
  
      }).catch(function(err) {
        console.error(err);
      });
          
      
     },
     async getProjectInfo(tag) {
       const res = await fetch(`https://cmgt.hr.nl:8000/api/projects/?page=1&limit=12&tag=${tag}`);
        
        if (res.status == 404) {
         this.showAlert();
       }
       this.info = await res.json();
       
       var searchData = {
            projects: this.info.projects,
          
          };
      
      localforage.setItem('searchedProjects', searchData).then(function (searchData) {
  
      }).catch(function(err) {
        console.error(err);
      });
          
     
     
     }, async getTagInfo() {
       const res = await fetch(`https://cmgt.hr.nl:8000/api/projects/tags/`);
         if (res.status == 200){
        this.tags = await res.json();
               
       } else{
         this.showOfflineAlert();
        }
     },         
     
     clearInfo() {
  
      this.info = null;
      localforage.clear('projects', 'searchData');
    
     },
     showAlert() {
      return this.$ionic.alertController
        .create({
          header: "Not Valid",
          message: "Please enter a valid tag",
          buttons: ["OK"]
        })
        .then(a => a.present());
    },
   
    showOfflineAlert() {
      return this.$ionic.alertController
        .create({
          header: "You are offline",
          message: "Please retry your connection",
          buttons: ["OK"]
        })
        .then(a => a.present());
    },
   
   }
 
};
</script>
