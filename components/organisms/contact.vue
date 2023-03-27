<template>
  <div>
    <div class="xl:flex">
      <div class="xl:w-1/3 xl:mr-8 mb-4 p-4">
        <h2 class="text-purple font-black text-2xl mb-4">
          <span
            class="pb-2 border-purple border-solid border-b-1 inline-block"
          >
            {{ lang === 'en' ? 'On The Web' : 'Media Sosial' }}
          </span>
        </h2>
        <div class="grid grid-cols-2">
          <a
            v-for="link in links"
            :key="link.Name"
            :href="link.Link"
            :alt="link.Name"
            rel="noreferrer"
            target="_blank"
            class="flex bg-pink md:bg-purple text-purple md:text-yellow font-bold p-4 pl-8 text-left m-1 hover:bg-pink hover:text-purple"
            style="border-radius: 20px"
          >
            <div v-if="link.Icon" class="mr-2" v-html="link.Icon" />
            {{ link.Name }}
          </a>
        </div>
      </div>
      <div class="xl:w-2/3 bg-white p-4 rounded mb-4 rounded-default border-1 border-purple">
        <h2 class="text-purple font-black text-2xl mb-4">
          <span class="pb-2 border-purple border-solid border-b-1 inline-block">
            Email
          </span>
        </h2>
        <ContactForm />
      </div>
    </div>
  </div>
</template>

<script>
import ContactForm from '@/components/molecules/forms/contact-form'

export default {
  components: { ContactForm },
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
    links() {
      return this.$store.state.global.links
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
