<template>
  <form
    @submit="submit"
    novalidate="true"
  >
    <div v-if="errors.length" class="alert alert-danger" role="alert">
      <h4>Please correct the following error(s):</h4>
      <ul>
        <li v-for="(error, index) in errors" :key="`${index}`">{{ error }}</li>
      </ul>
    </div>

    <div class="form-group">
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" class="form-control" v-model="event.title">
    </div>
    <div class="form-group">
      <label for="desc">Description:</label>
      <textarea id="desc" name="desc" class="form-control" v-model="event.description"></textarea>
    </div>
    <div class="row">
      <div class="form-group col-sm-4">
        <label for="startTime">From:</label>
        <input type="time" id="startTime" name="startTime" class="form-control"
               v-model="event.startTime" required>
      </div>
      <div class="form-group col-sm-4">
        <label for="endTime">To:</label>
        <input type="time" id="endTime" name="endTime" class="form-control"
               v-model="event.endTime" required>
      </div>
    </div>

    <button type="submit" class="btn btn-primary"> Apply</button>
    <button type="button" class="btn btn-primary" @click="cancel()"> Cancel</button>
  </form>
</template>

<script>
export default {
  name: 'EventForm',
  props: {
    event: Object,
  },
  data() {
    return {
      errors: [],
    };
  },
  methods: {
    submit(e) {
      this.errors = [];
      e.preventDefault();

      if (!this.event.title) {
        this.errors.push('Title ');
      }

      if (!this.errors.length) {
        this.apply();
      }

      return false;
    },
    apply() {
      this.$emit('on-apply', this.event);
    },
    cancel() {
      this.$emit('on-cancel', this.event);
    },
  },
};
</script>

<style scoped>
form {
  text-align: left;
}
</style>
