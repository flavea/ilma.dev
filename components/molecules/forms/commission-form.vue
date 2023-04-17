<template>
  <form ref="form" @submit.prevent="">
    <InputField :label="texts.name[lang]">
      <input
        v-model="commissionForm.Name"
        :placeholder="texts.name[lang]"
        type="text"
        required
      />
    </InputField>

    <InputField :label="texts.email[lang]">
      <input
        v-model="commissionForm.Email"
        :placeholder="texts.email[lang]"
        type="email"
        required
      />
    </InputField>

    <TextareaField v-if="categories.length" :label="texts.project[lang]">
      <div v-for="cat in categories" :key="cat.id">
        <div class="checkbox text-purple font-bold mb-1">
          <input
            :id="'cb' + cat.id"
            v-model="commissionForm.Categories"
            :value="cat.id"
            type="checkbox"
          />
          <label :for="'cb' + cat.id">
            {{ cat.Name }} (IDR {{ cat.IDR }} // USD {{ cat.USD }})
          </label>
        </div>
        <div class="text-sm mb-2" v-html="$md.render(cat.Explanation)" />
      </div>
    </TextareaField>

    <TextareaField :label="texts.link[lang]">
      <input v-model="commissionForm.Sketch" type="text" placeholder="URL" />
    </TextareaField>

    <TextareaField :label="texts.message[lang]">
      <textarea
        v-model="commissionForm.Message"
        :placeholder="texts.message[lang]"
        class="w-full block h-48"
      />
    </TextareaField>

    <div class="text-right">
      <input
        class="button"
        type="submit"
        placeholder="Your Message"
        @click="submitComm"
      />
    </div>
  </form>
</template>

<script>
import InputField from '@/components/atoms/input-field'
import TextareaField from '@/components/atoms/textarea-field'

export default {
  components: {
    InputField,
    TextareaField,
  },
  props: {
    categories: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      commissionForm: {
        Name: '',
        Sketch: '',
        Message: '',
        Email: '',
        Categories: [],
      },
      texts: {
        email: {
          en: 'Your Email',
          'id-ID': 'Email Anda',
        },
        name: {
          en: 'Your Name',
          'id-ID': 'Nama Anda',
        },
        project: {
          en: 'Project Type',
          'id-ID': 'Tipe Project',
        },
        message: {
          en: 'Your Message',
          'id-ID': 'Pesan Anda',
        },
        link: {
          en: 'Link to design/sketch/mock up if there is any',
          'id-ID': 'Tautan desain/mock up jika ada',
        },
      },
    }
  },
  computed: {
    lang() {
      return this.$cookies.get('lang') || 'en'
    },
  },
  methods: {
    submitComm() {
      if (this.$refs.form.checkValidity()) {
        this.$axios
          .post('/commissions', this.commissionForm)
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
      this.formCommission = {
        Name: '',
        Site: '',
        Sketch: '',
        Message: '',
        Email: '',
        Categories: [],
      }
    },
  },
}
</script>
