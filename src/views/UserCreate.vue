<template>
  <div>
    <h1>Create an User</h1>
    <form @submit.pruser="createUser">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="user.category"
        :class="{ error: $v.user.category.$error }"
        @blur="$v.user.category.$touch()"
      />
      <template v-if="$v.user.category.$error">
        <p v-if="!$v.user.category.required" class="errorMessage">
          Category is required.
        </p>
      </template>

      <h3>Name & describe your user</h3>
      <BaseInput
        label="Title"
        v-model="user.title"
        type="text"
        placeholder="Title"
        class="field"
        :class="{ error: $v.user.title.$error }"
        @blur="$v.user.title.$touch()"
      />

      <template v-if="$v.user.title.$error">
        <p v-if="!$v.user.title.required" class="errorMessage">
          Title is required.
        </p>
      </template>

      <BaseInput
        label="Description"
        v-model="user.description"
        type="text"
        placeholder="Description"
        class="field"
        :class="{ error: $v.user.description.$error }"
        @blur="$v.user.description.$touch()"
      />

      <template v-if="$v.user.description.$error">
        <p v-if="!$v.user.description.required" class="errorMessage">
          Description is required.
        </p>
      </template>

      <h3>Where is your user?</h3>
      <BaseInput
        label="Location"
        v-model="user.location"
        type="text"
        placeholder="Location"
        class="field"
        :class="{ error: $v.user.location.$error }"
        @blur="$v.user.location.$touch()"
      />

      <template v-if="$v.user.location.$error">
        <p v-if="!$v.user.location.required" class="errorMessage">
          Location is required.
        </p>
      </template>

      <h3>When is your user?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="user.date"
          placeholder="Select a date"
          :input-class="{ error: $v.user.date.$error }"
          @opened="$v.user.date.$touch()"
        />
      </div>

      <template v-if="$v.user.date.$error">
        <p v-if="!$v.user.date.required" class="errorMessage">
          Date is required.
        </p>
      </template>

      <BaseSelect
        label="Select a time"
        :options="times"
        v-model="user.time"
        class="field"
        :class="{ error: $v.user.time.$error }"
        @blur="$v.user.time.$touch()"
      />

      <template v-if="$v.user.time.$error">
        <p v-if="!$v.user.time.required" class="errorMessage">
          Time is required.
        </p>
      </template>

      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
        >Submit</BaseButton
      >
      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>


<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'

export default {
  components: {
    Datepicker,
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      user: this.createFreshUserObject(),
    }
  },
  validations: {
    user: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    },
  },
  methods: {
    createUser() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        NProgress.start()
        this.$store
          .dispatch('user/createUser', this.user)
          .then(() => {
            this.$router.push({
              name: 'user-show',
              params: { id: this.user.id },
            })
            this.user = this.createFreshUserObject()
          })
          .catch(() => {
            NProgress.done()
          })
      }
    },
    createFreshUserObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
      }
    },
  },
}
</script>
