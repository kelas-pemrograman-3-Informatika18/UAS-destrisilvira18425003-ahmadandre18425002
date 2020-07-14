<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left"></div>
          </div>
          <div class="col">
            <q-banner inline-actions class="text-light-green">
              <div class="text-h6">Edit</div>
              <div >Input Tiket Pesawat</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>

    <q-card flat>
      <q-card-section class="row">
        <q-form
        @submit="onSubmit()"
            class="q-col-gutter-md q-col-lg-6 col-md-6 col-xs-12"
            >
            <q-input
                filled
                v-model="form.tiketPesawat"
                label="Tiket Pesawat"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Masukkan Tiket Pesawat']"
            />

             <q-input
              filled
              v-model="form.harga"
              label="Harga"
              type="number"
              lazy-rules
            />

            <q-input
              filled
              v-model="form.tanggal"
              label="Tanggal Berangkat"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Masukkan Tanggal']"
            />

            <q-select
              filled
              v-model="form.tujuan"
              :options="optiontujuan"
              label="Pilih Tujuan"
              :rules="[ val => val && val.length > 0 || 'Pilihlah Tujuan']"
            />

            <div class="flex">
              Pilih Rating
            </div>

            <q-input
              v-model="form.deskripsi"
              filled
              type="textarea"
              label="Deskripsi"
              :rules="[ val => val && val.length > 0 || 'Masukkan Deskripsi']"
            />

            <q-file accept=".jpg, image/*" color="light-green" filled v-model="image" label="Upload Gambar">
              <template v-slot:prepend>
                <q-icon name="cloud_upload" />
              </template>
            </q-file>

            <div>
                <q-btn label="Submit" type="submit" color="light-green"/>
                <q-btn label="Reset" type="reset" color="light-green" flat class="q-ml-sm" />
            </div>

        </q-form>
      </q-card-section>
    </q-card>

  </q-page>
</template>
<script>
export default {
  data () {
    return {
      form: {
        tiketPesawat: null,
        harga: 0,
        tanggal: null,
        tujuan: null,
        rating: 0,
        deskripsi: null
      },
      optionTujuan: [
        'Palembang',
        'Bandar Lampung',
        'Jakarta',
        'Bandung',
        'Bali',
        'Medan'
      ],
      image: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get(`movie/getbyid/${this.$route.params.id}`)
        .then(res => {
          if (res.data.sukses) {
            this.form = res.data.data
          } else {
            this.$router.push({ name: 'dataTiket' })
          }
        })
    },
    onSubmit () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify(this.form))
      this.$axios.put(`movie/edit/${this.$route.params.id}`, formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.$router.push({ name: 'dataTiket' })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  }
}
</script>
<style scoped>
.left {
  width: 4px;
  height: 100%;
  background-color: rgb(24, 175, 4);
}
</style>
