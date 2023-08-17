import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RealTimeChart = () => {
  const [chartData, setChartData] = useState({ timeStamp: [], pasos: [], max_bpm: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://172.18.4.15:8000/0321101263/valores');
        const data = response.data.data;
        const timeStamp = data.map(item => item.date);
        const pasos = data.map(item => item.pasos);
        const max_bpm = data.map(item => item.max_bpm);

        setChartData({ timeStamp, pasos, max_bpm });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const webViewHTML = `
    <html>
    <head>
        <title>Highcharts Example</title>
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </head>
    <body>
    <div class="container">
        <!-- Cuadro de pasos totales, peor lo quitaremos por el momento que no funciona
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Pasos Totales (Último Día)</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">${
                    chartData.pasos.length > 0 ? chartData.pasos[0] : 'N/A'
                  }</div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-walking fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        -->

      <div style="display: flex; flex-direction: column; align-items: center;">
        <div id="container-line" style="width: 100%;"></div>
        <div style="margin-top: 20px;">
      <button
        onclick="showMessage()"
        style="background-color: #FF5733; color: white; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 5px;"
      >
        Recomendaciones
      </button>
    </div>
        <div id="container-pie" style="width: 100%;"></div>
        <div id="container-bpm" style="width: 100%;"></div>
      </div>
      <script>
          Highcharts.setOptions({
              chart: {
                  style: {
                      fontFamily: 'Arial, sans-serif'
                  }
              }
          });

          // Configuración de la gráfica de líneas
          Highcharts.chart('container-line', {
              chart: {
                  type: 'spline'
              },
              title: {
                  text: 'Historial de pasos al día'
              },
              subtitle: {
                  text: 'Datos actualizados al día'
              },
              xAxis: {
                  type: 'datetime',
                  title: {
                      text: 'FECHA'
                  },
                  labels: {
                      rotation: -45,
                      format: '{value:%Y-%m-%d %H:%M}'
                  },
                  categories: ${JSON.stringify(chartData.timeStamp)}
              },
              yAxis: {
                  title: {
                      text: 'Pasos'
                  }
              },
              plotOptions: {
                  spline: {
                      marker: {
                          enabled: true,
                          radius: 4,
                          symbol: 'circle'
                      }
                  }
              },
              colors: ['#FF5733'],
              series: [{
                  name: 'Pasos',
                  data: ${JSON.stringify(chartData.pasos)},
                  enablePolling: true
              }],
              legend: {
                  align: 'right',
                  verticalAlign: 'top',
                  layout: 'vertical'
              }
          });

          // Configuración de la gráfica de pastel
          Highcharts.chart('container-pie', {
              title: {
                  text: 'Pasos Actuales'
              },
              series: [{
                  type: 'pie',
                  name: 'Pasos',
                  data: ${JSON.stringify(chartData.pasos)}
              }]
          });

          // Configuración de la gráfica de barras para ritmo cardíaco
          Highcharts.chart('container-bpm', {
              chart: {
                  type: 'bar'
              },
              title: {
                  text: 'Ritmo Cardíaco Máximo'
              },
              xAxis: {
                  categories: ${JSON.stringify(chartData.timeStamp)},
                  title: {
                      text: 'FECHA'
                  }
              },
              yAxis: {
                  title: {
                      text: 'BPM'
                  }
              },
              series: [{
                  name: 'Ritmo Cardíaco Máximo',
                  data: ${JSON.stringify(chartData.max_bpm)}
              }]
          });

          // Función para recomendaciones
          function showMessage() {
              alert('Caminar es una actividad esencial para mantener un estilo de vida saludable. Se recomienda caminar al menos 10,000 pasos al día para mejorar tu bienestar físico y mental. ¡Aprovecha cada oportunidad para moverte y alcanzar tus metas diarias de pasos!');
          }
      </script>
    </body>
    </html>
  `;

  return (
    <div style={{ flex: 1 }}>
      {/* Reemplazado WebView de React Native con un iframe */}
        <iframe
        title="Gráficos en tiempo real"
        srcDoc={webViewHTML}
        style={{ width: '100%', height: '100vh', border: 'none' }}
      />

    </div>
  );
};

export default RealTimeChart;
