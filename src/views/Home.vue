<template>
  <div class="text-center">
    <h2>Clasificación de video a LSC</h2>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card>
              <div v-if="processing">
                <v-progress-linear
                  indeterminate
                  color="cyan"
                ></v-progress-linear>
              </div>
              <v-card-text>
                <v-form id="form">
                  <v-text-field
                    prepend-icon="mdi-account"
                    name="userName"
                    label="Nombre de usuario"
                    id="userName"
                    v-model="userName"
                  ></v-text-field>
                  <v-file-input label="Seleccione un archivo" name="video" @change="showVideo($event)"></v-file-input>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="processing" color="success" @click="processVideo()">Procesar</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'Home',
    data: () => ({
        file: null,
        urlBase: 'http://localhost:5000',
        userName: '',
        processing: false
    }),
    methods: {
      processVideo: function() {
        if (this.userName != '' && this.file != null) {
          this.result = {
            class: -1,
            predictions: []
          };
          const form = new FormData(document.getElementById('form'));
          this.processing = true;
          axios.post(`${this.urlBase}/api/process`, form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
            this.$store.dispatch('setResult', response.data);
            this.$router.push({ name: 'Result' });
          }).catch(err => {
            console.log(err);
          });
        }

      },
      showVideo: function(evt) {
        this.file = evt;
        this.$store.dispatch('setVideoUrl', URL.createObjectURL(evt));
      },
      saludar: () => {
        console.log('XD');
      }
    }
  }
</script>
