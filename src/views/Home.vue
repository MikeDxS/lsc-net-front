<template>
  <div class="text-center">
    <h2>Clasificación de video de la LSC</h2>
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
                    @change="validate()"
                  ></v-text-field>
                  <v-file-input
                  label="Seleccione un video"
                  name="video"
                  @change="showVideo($event)"
                  accept="video/*"
                  prepend-icon="mdi-video">
                  </v-file-input>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="processing || !valid" color="success" @click="processVideo()">Procesar</v-btn>
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
        urlBase: 'https://lesecol-net-as.azurewebsites.net',
        userName: '',
        processing: false,
        valid: false
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
            alert('No se ha podido cargar el video, intente de nuevo más tarde');
            location.reload();
          });
        }

      },
      showVideo: function(evt) {
        this.file = evt;
        if (evt) {
          if (this.file.type.indexOf('video') == -1) {
            alert('El archivo no es de un formato válido. Por favor, suba un archivo de video.');
            this.file = null;
            console.log(evt);
          }
          else {
            this.$store.dispatch('setVideoUrl', URL.createObjectURL(evt));
          }
        }
        this.validate();
      },
      closeMessage: function () {
        this.showMessage = false;
      },
      saludar: () => {
        console.log('XD');
      },
      validate: function () {
        this.valid = (this.userName != '') && (this.file != null);
      }
    }
  }
</script>
