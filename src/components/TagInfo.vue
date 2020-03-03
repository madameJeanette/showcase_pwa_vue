<template>
 <!-- @detected-condition fires when the connectivity status of the device changes -->
  <offline @detected-condition="handleConnectivityChange">
    <!-- Only renders when the device is online -->
    <div slot="online">
      <p colour= 'success' >You're online!</p> 
        <ion-col v-if="tags">
    <h5>Available tags:</h5>
    <ion-chip color="success" v-for="tag in tags.tags" v-bind:key='tag.src'>
    {{tag}}                   
    </ion-chip >    
  </ion-col>
    </div>
<!-- Only renders when the device is offline -->
    <div slot="offline">
      <p>You appear to be offline, that's okay, we can still do things...</p>
    </div>
  </offline>
</template>
<script>
import offline from 'v-offline';


export default {
  components: {
    offline
  },
    methods: {
    handleConnectivityChange(status) {
      console.log(status);
    }
  },

  name: "TagInfo",
  props: ["tags"],
 
};
</script>
