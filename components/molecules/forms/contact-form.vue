<template>
  <form ref="form" @submit.prevent="">
    <InputField label="Email">
      <input
        v-model="contactForm.Email"
        type="email"
        required
        placeholder="user@ilma.dev"
      />
    </InputField>

    <InputField :label="lang === 'en' ? 'Subject' : 'Subyek'">
      <input
        v-model="contactForm.Subject"
        type="text"
        required
        placeholder="Hello!"
      />
    </InputField>

    <TextareaField
      :label="lang === 'en' ? 'Message' : 'Pesan'"
      class="textarea border-pink border-1 border-solid p-2 block mb-2"
    >
      <textarea
        v-model="contactForm.Message"
        :placeholder="lang === 'en' ? 'Message' : 'Pesan'"
        class="w-full block h-24"
        required
      />
    </TextareaField>

    <div class="text-right">
      <input class="button" type="submit" value="Send" @click="submit" />
    </div>
  </form>
</template>

<script>
import InputField from '@/components/atoms/input-field'
import TextareaField from '@/components/atoms/textarea-field'

export default {
  components: { InputField, TextareaField },
  transition: 'default',
  data() {
    return {
      contactForm: {
        Email: '',
        Message: '',
        Subject: '',
      },
    }
  },
  computed: {
    lang() {
      return this.$cookies.get('lang') || 'en'
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.checkValidity()) {
        this.$axios
          .post('/contacts', this.contactForm)
          .then((res) => {
            alert('Message sent!')
            this.resetForm()
          })
          .catch((error) => {
            alert(error)
          })
      }
    },
    resetForm() {
      this.contactForm = {
        Email: '',
        Message: '',
        Subject: '',
      }
    },
  },
}
</script>
