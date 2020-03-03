<template>
  <ion-grid>
    <form @submit.prevent="onSubmit">
      <ion-col>
        <ion-item>
          <ion-label>Project tag:</ion-label>
          <ion-input
            :value="tag"
            @input="tag = $event.target.value"
            placeholder="Enter project tag"
            name="tag"
          ></ion-input>
        </ion-item>
      </ion-col>
      <ion-col>
        <ion-button type="submit" color="tertiary" expand="block">Find</ion-button>
      </ion-col>
    </form>
  </ion-grid>
</template>

<script>
export default {
  name: "ProjectSearch",
  data() {
     return {
      tag: ""
     };
   },
  methods: {
     onSubmit(e) {
      e.preventDefault();
         // tag Regex
       const isValidTag = /[A-Za-z\s?]+/.test(this.tag);
       // Test for valid tag
        if (!isValidTag) {
          this.showAlert();
          this.tag = "";
       } else {
        this.$emit("get-tag", this.tag);
        this.tag = "";
       }
      }, 
      showAlert() {
        return this.$ionic.alertController
          .create({
              header: "Enter tag",
              message: "Please enter a valid tag",
              buttons: ["OK"]
          })
          .then(a => a.present());
      }
  }
     
};
</script>
