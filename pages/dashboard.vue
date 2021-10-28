<template>
  <div>
    <v-row>
      <v-col lg="6" cols="12">
        <e-charts :options="dadosHoje" width="100%">
          <template #title> <b>Diário</b> </template>
        </e-charts>
      </v-col>
      <v-col lg="6" cols="12">
        <e-charts :options="dadosSemanal" width="100%">
          <template #title> <b>Média semanal</b> </template>
        </e-charts>
      </v-col>
    </v-row>

    <!-- FAB das opções base -->
    <v-speed-dial
      v-model="bottomMenu"
      class="fab-rotate"
      bottom
      right
      direction="top"
      fixed
      transition="slide-y-reverse-transition"
    >
      <template #activator>
        <v-btn
          v-model="bottomMenu"
          :class="bottomMenu ? 'p45' : 'm45'"
          color="primary"
          bottom
          right
          dark
          fab
        >
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </template>

      <v-tooltip left>
        <template #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            fab
            dark
            small
            color="teal darken-1"
            v-on="on"
            @click="$refs.dialogNovaHorta.open"
          >
            <v-icon>mdi-store-plus</v-icon>
          </v-btn>
        </template>
        <span>Nova horta</span>
      </v-tooltip>

      <v-tooltip left>
        <template #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            fab
            dark
            small
            color="pink darken-3"
            v-on="on"
            @click="$refs.dialogVincularSensor.open"
          >
            <v-icon>mdi-link-variant-plus</v-icon>
          </v-btn>
        </template>
        <span>Vincular sensor</span>
      </v-tooltip>
    </v-speed-dial>

    <dialogs-nova-horta ref="dialogNovaHorta"></dialogs-nova-horta>
    <dialogs-vincular-sensor
      ref="dialogVincularSensor"
    ></dialogs-vincular-sensor>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { DateTime } from "luxon";
import _ from "lodash";

export default {
  name: "Dashboard",
  data() {
    return {
      bottomMenu: false,

      // Dados de leitura
      leituraSemanal: {
        headers: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        dados: [],
      },
    };
  },

  computed: {
    ...mapGetters({
      hortaAtual: "settings/hortaAtual",
      sensores: "horta/sensores",
    }),

    dadosHoje() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
        ],
      };
    },

    dadosSemanal() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["Umidade do solo"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.leituraSemanal.headers,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Umidade do solo",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: this.leituraSemanal.dados,
          },
        ],
      };
    },
  },

  mounted() {
    const today = DateTime.fromJSDate(new Date()).toUTC();
    const firstDateOfThisWeek = today.startOf("week");
    const lastDateOfThisWeek = today.endOf("week");

    this.getLeituras(this.hortaAtual.id).then((dados) => {
      const leituras = dados.map((sens) => sens.Leitura);
      const dadosFinal = _.flattenDeep(leituras).filter((leitura) => {
        const readedAt = DateTime.fromISO(leitura.readed_at);
        return (
          readedAt >= firstDateOfThisWeek && readedAt <= lastDateOfThisWeek
        );
      });

      const result = [];

      for (const dayOfWeek in this.leituraSemanal.headers) {
        let count = 0; // Total que será adicionaro ao array `result`
        let amount = 0; // Contagem da quantidade de dados para cálculo da média

        for (const leitura of dadosFinal) {
          const datesDayOfWeek =
            DateTime.fromISO(leitura.readed_at).weekday - 1;
          if (datesDayOfWeek !== dayOfWeek) continue;

          count += leitura.soil_humidity;
          amount++;
        }

        if (amount === 0 || count === 0) {
          result.push(0);
          continue;
        }

        const mean = count / amount;
        result.push(mean.toFixed(1));
      }

      this.leituraSemanal.dados = [...result];
    });
  },

  methods: {
    ...mapActions({
      getLeituras: "horta/getLeiturasHorta",
    }),
  },
};
</script>
