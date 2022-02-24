<template>
    <v-row>
        <v-col cols="12" md="2"></v-col>
        <v-col cols="12" md="8">
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Clasificación de video a lengua de señas</h3>
                        <div>Según el modelo la seña corresponde a {{ classes[result.class] }}</div>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-row v-if="result.class >= 0">
                        <v-col cols="12" md="7">
                            <video v-if="videoUrl.length > 0" :src="videoUrl" width="100%" controls></video>
                        </v-col>
                        <v-col cols="12" md="5" v-if="result.predictions.length > 0">
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th>Mes</th>
                                            <th>Confianza(%)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(position, key) in order" :key="key">
                                        <td>{{ classes[position] }}</td>
                                        <td>{{ result.predictions[position] | percent }}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-row>
                    <div class="d-flex justify-center">
                        <v-btn color="grey lighten-2" @click="goBack()">Volver</v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" md="2"></v-col>
    </v-row>
</template>
<script>
export default {
    name: 'Result',
    data: () => ({
        result: null,
        videoUrl: null,
        classes: ['Enero',
          'Octubre',
          'Noviembre',
          'Diciembre',
          'No mes',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre'
        ],
        order: [0, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4]
    }),
    methods: {
        goBack(){
            this.$router.go(-1);
        }
    },
    filters: {
      percent: function(number){
        const scaledNumber = number * 100.0;
        return `${scaledNumber.toFixed(2)}%`;
      }
    },
    beforeMount(){
        this.result = this.$store.getters.getResult;
        this.videoUrl = this.$store.getters.getVideoUrl;
    }
}
</script>