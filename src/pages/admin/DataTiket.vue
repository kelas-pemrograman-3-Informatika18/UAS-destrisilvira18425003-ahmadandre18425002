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
              <div class="text-h6">Data Tiket Pesawat</div>
              <div >Data Tiket Pesawat</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
          <q-table
      :data="data"
      flat
      :columns="columns"
      row-key="name"
    >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="tiketPesawat" :props="props">
              {{ props.row.tiketPesawat }}
            </q-td>
            <q-td key="harga" :props="props">
              {{ props.row.harga }}
            </q-td>
            <q-td key="tanggal" :props="props">
              {{ props.row.tanggal }}
            </q-td>
            <q-td key="tujuan" :props="props">
              {{ props.row.tujuan }}
            </q-td>
            <q-td key="deskripsi" :props="props">
              <div class="ellipsis" style="max-width: 100px;">
                {{ props.row.deskripsi }}
              </div>
            </q-td>
            <q-td key="image" :props="props">
              <q-img
                :src="`${$baseImageURL}/${props.row.image}`"
                spinner-color="white"
                />
            </q-td>
             <q-td key="aksi" :props="props">
                <div class="row q-gutter-md">
                    <q-btn :to="{ name: 'formEdit', params: { id: props.row._id }}" label="Edit" icon="edit" color="warning"/>
                    <q-btn @click="deleteMovie(props.row._id)" label="Hapus" icon="delete" color="red"/>
                </div>
            </q-td>

          </q-tr>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      columns: [
        { name: 'tiketPesawat', align: 'left', label: 'Tiket Pesawat', field: 'tiketPesawat', sortable: true },
        { name: 'harga', align: 'left', label: 'Harga', field: 'harga', sortable: true },
        { name: 'tanggal', align: 'left', label: 'tanggal Berangkat', field: 'tanggal', sortable: true },
        { name: 'tujuan', align: 'left', label: 'Tujuan', field: 'tujuan', sortable: true },
        { name: 'deskripsi', align: 'left', label: 'Deskripsi', field: 'deskripsi', sortable: true },
        { name: 'image', align: 'left', label: 'Gambar', field: 'image' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      data: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('movie/getall')
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    deleteMovie (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Yakin Hapus?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete(`movie/delete/${id}`)
          .then(res => {
            if (res.data.sukses) {
              this.$showNotif(res.data.pesan, 'positive')
              this.getData()
            } else {
              this.$showNotif(res.data.pesan, 'negative')
            }
          })
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
