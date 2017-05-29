
    $(function () {
      var jsondata;
      var lineDataset = [[0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]];
      var radarDataset = [[76.053, 31.762, 55.05, 64.463, 59.746], [17.73, 66.501, 35.58, 14.87, 26.69], [6.20, 1.737, 9.364, 20.661, 13.559]];
      var dataset = [1893, 2065, 609, 214, 54, 178, 12, 44, 55, 346];
      var datasetpercentage = [(1893/5470*100).toFixed(3), (2065/5470*100).toFixed(3), (609/5470*100).toFixed(3), (214/5470*100).toFixed(3), (54/5470*100).toFixed(3), (178/5470*100).toFixed(3), (12/5470*100).toFixed(3), (44/5470*100).toFixed(3), (55/5470*100).toFixed(3), (346/5470*100).toFixed(3)];
      $.getJSON('dtime.json', function(data){
        jsondata = data;
        $('#total')[0].innerText = jsondata.total;
        jsondata.stats = jsondata.stats.sort(function(a, b) { return a.id - b.id;});
        let c1=1,c2,c3,c4,c5,c6,c7,c8,c9,c10
        $.each(data.stats, function(key, value) {
          if (value.type == 'research'){
            $("#research").append('<li><a href="#">' + value.name + "</a></li>");
            c1++;
          }
          else if (value.type == 'learning')
            $("#learning").append('<li><a href="#">' + value.name + "</a></li>");
          else if (value.type == 'engagement')
            $("#engagement").append('<li><a href="#">' + value.name + "</a></li>");
          else if (value.type == 'operational')
            $("#operational").append('<li><a href="#">' + value.name + "</a></li>");
          else if (value.type == 'staff')
            $("#staff").append('<li><a href="#">' + value.name + "</a></li>");
          else if (value.type == 'cross')
            $("#cross").append('<li><a href="#">' + value.name + "</a></li>");
          else if (value.type == 'lived')
            $("#lived").append('<li><a href="#">' + value.name + "</a></li>");
          else if (value.type == 'international')
            $("#international").append('<li><a href="#">' + value.name + "</a></li>");
          else if (value.type == 'sustainability')
            $("#sustainability").append('<li><a href="#">' + value.name + "</a></li>");
          else{
            $("#other").append('<li><a href="#">' + value.name + "</a></li>");
          }
        });

        $(".treeview li a").click(function() {
          var item = $(this)[0];
          //$("span.current")[0].innerHTML = item.innerHTML;
          for (var i=0; i<jsondata.stats.length; i++) {
            if (jsondata.stats[i].topic == "optimising-the-student-learning-experience-at-dcu") {
              radarDataset[0][0] = +jsondata.stats[i].acaStaff.percentage + +jsondata.stats[i].profStaff.percentage;
              radarDataset[1][0] = +jsondata.stats[i].undergrad.percentage + +jsondata.stats[i].postgrad.percentage + +jsondata.stats[i].phd.percentage;
              radarDataset[2][0] = +jsondata.stats[i].alum.percentage + +jsondata.stats[i].partner.percentage + +jsondata.stats[i].friend.percentage + +jsondata.stats[i].guest.percentage + +jsondata.stats[i].other.percentage;
            }
            if (jsondata.stats[i].topic == "continuing-the-conversation-student-life-at-dcu") {
              radarDataset[0][1] = +jsondata.stats[i].acaStaff.percentage + +jsondata.stats[i].profStaff.percentage;
              radarDataset[1][1] = +jsondata.stats[i].undergrad.percentage + +jsondata.stats[i].postgrad.percentage + +jsondata.stats[i].phd.percentage;
              radarDataset[2][1] = +jsondata.stats[i].alum.percentage + +jsondata.stats[i].partner.percentage + +jsondata.stats[i].friend.percentage + +jsondata.stats[i].guest.percentage + +jsondata.stats[i].other.percentage;
            }
            if (jsondata.stats[i].topic == "enhancing-student-life-outside-the-lecture-theatre") {
              radarDataset[0][2] = +jsondata.stats[i].acaStaff.percentage + +jsondata.stats[i].profStaff.percentage;
              radarDataset[1][2] = +jsondata.stats[i].undergrad.percentage + +jsondata.stats[i].postgrad.percentage + +jsondata.stats[i].phd.percentage;
              radarDataset[2][2] = +jsondata.stats[i].alum.percentage + +jsondata.stats[i].partner.percentage + +jsondata.stats[i].friend.percentage + +jsondata.stats[i].guest.percentage + +jsondata.stats[i].other.percentage;
            }
            if (jsondata.stats[i].topic == "inclusion-widening-participation-in-education") {
              radarDataset[0][3] = +jsondata.stats[i].acaStaff.percentage + +jsondata.stats[i].profStaff.percentage;
              radarDataset[1][3] = +jsondata.stats[i].undergrad.percentage + +jsondata.stats[i].postgrad.percentage + +jsondata.stats[i].phd.percentage;
              radarDataset[2][3] = +jsondata.stats[i].alum.percentage + +jsondata.stats[i].partner.percentage + +jsondata.stats[i].friend.percentage + +jsondata.stats[i].guest.percentage + +jsondata.stats[i].other.percentage;
            }
            if (jsondata.stats[i].topic == "an-ghaeilge-i-dcu") {
              radarDataset[0][4] = +jsondata.stats[i].acaStaff.percentage + +jsondata.stats[i].profStaff.percentage;
              radarDataset[1][4] = +jsondata.stats[i].undergrad.percentage + +jsondata.stats[i].postgrad.percentage + +jsondata.stats[i].phd.percentage;
              radarDataset[2][4] = +jsondata.stats[i].alum.percentage + +jsondata.stats[i].partner.percentage + +jsondata.stats[i].friend.percentage + +jsondata.stats[i].guest.percentage + +jsondata.stats[i].other.percentage;
            }

            if (jsondata.stats[i].name.trim() == item.innerText.trim()) {
              $('#total')[0].innerText = jsondata.stats[i].topictotal;
              dataset = [
                jsondata.stats[i].acaStaff.total, jsondata.stats[i].profStaff.total, jsondata.stats[i].undergrad.total, jsondata.stats[i].postgrad.total,
                jsondata.stats[i].phd.total, jsondata.stats[i].alum.total, jsondata.stats[i].partner.total, jsondata.stats[i].friend.total,
                jsondata.stats[i].guest.total, jsondata.stats[i].other.total
              ];

              datasetpercentage = [
                jsondata.stats[i].acaStaff.percentage, jsondata.stats[i].profStaff.percentage, jsondata.stats[i].undergrad.percentage, jsondata.stats[i].postgrad.percentage,
                jsondata.stats[i].phd.percentage, jsondata.stats[i].alum.percentage, jsondata.stats[i].partner.percentage, jsondata.stats[i].friend.percentage,
                jsondata.stats[i].guest.percentage, jsondata.stats[i].other.percentage
              ];

              lineDataset[0][0] = jsondata.stats[i].acaStaff.timeline.zero;
              lineDataset[0][1] = jsondata.stats[i].acaStaff.timeline.twenty;
              lineDataset[0][2] = jsondata.stats[i].acaStaff.timeline.fourty;
              lineDataset[0][3] = jsondata.stats[i].acaStaff.timeline.sixty;
              lineDataset[0][4] = jsondata.stats[i].acaStaff.timeline.eighty;
              lineDataset[0][5] = jsondata.stats[i].acaStaff.timeline.hun;
              lineDataset[0][6] = jsondata.stats[i].acaStaff.timeline.huntwenty;
              lineDataset[0][7] = jsondata.stats[i].acaStaff.timeline.plus;
              
              lineDataset[1][0] = jsondata.stats[i].profStaff.timeline.zero;
              lineDataset[1][1] = jsondata.stats[i].profStaff.timeline.twenty;
              lineDataset[1][2] = jsondata.stats[i].profStaff.timeline.fourty;
              lineDataset[1][3] = jsondata.stats[i].profStaff.timeline.sixty;
              lineDataset[1][4] = jsondata.stats[i].profStaff.timeline.eighty;
              lineDataset[1][5] = jsondata.stats[i].profStaff.timeline.hun;
              lineDataset[1][6] = jsondata.stats[i].profStaff.timeline.huntwenty;
              lineDataset[1][7] = jsondata.stats[i].profStaff.timeline.plus;
              
              lineDataset[2][0] = jsondata.stats[i].undergrad.timeline.zero;
              lineDataset[2][1] = jsondata.stats[i].undergrad.timeline.twenty;
              lineDataset[2][2] = jsondata.stats[i].undergrad.timeline.fourty;
              lineDataset[2][3] = jsondata.stats[i].undergrad.timeline.sixty;
              lineDataset[2][4] = jsondata.stats[i].undergrad.timeline.eighty;
              lineDataset[2][5] = jsondata.stats[i].undergrad.timeline.hun;
              lineDataset[2][6] = jsondata.stats[i].undergrad.timeline.huntwenty;
              lineDataset[2][7] = jsondata.stats[i].undergrad.timeline.plus;

              lineDataset[3][0] = jsondata.stats[i].postgrad.timeline.zero;
              lineDataset[3][1] = jsondata.stats[i].postgrad.timeline.twenty;
              lineDataset[3][2] = jsondata.stats[i].postgrad.timeline.fourty;
              lineDataset[3][3] = jsondata.stats[i].postgrad.timeline.sixty;
              lineDataset[3][4] = jsondata.stats[i].postgrad.timeline.eighty;
              lineDataset[3][5] = jsondata.stats[i].postgrad.timeline.hun;
              lineDataset[3][6] = jsondata.stats[i].postgrad.timeline.huntwenty;
              lineDataset[3][7] = jsondata.stats[i].postgrad.timeline.plus;

              lineDataset[4][0] = jsondata.stats[i].other.timeline.zero;
              lineDataset[4][1] = jsondata.stats[i].other.timeline.twenty;
              lineDataset[4][2] = jsondata.stats[i].other.timeline.fourty;
              lineDataset[4][3] = jsondata.stats[i].other.timeline.sixty;
              lineDataset[4][4] = jsondata.stats[i].other.timeline.eighty;
              lineDataset[4][5] = jsondata.stats[i].other.timeline.hun;
              lineDataset[4][6] = jsondata.stats[i].other.timeline.huntwenty;
              lineDataset[4][7] = jsondata.stats[i].other.timeline.plus;

            }
          }
          piChart.data.datasets[0].data = dataset;
          piChart.update();
          barChart.data.datasets[0].data = datasetpercentage;
          barChart.update();
          radarChart.data.datasets[0].data = radarDataset[0];
          radarChart.data.datasets[1].data = radarDataset[1];
          radarChart.data.datasets[2].data = radarDataset[2];

          lineChart.data.datasets[0].data = lineDataset[0];
          lineChart.data.datasets[1].data = lineDataset[1];
          lineChart.data.datasets[2].data = lineDataset[2];
          lineChart.update();

          console.log(dataset)
          console.log(datasetpercentage)
          console.log(lineDataset)
        })
      })

      // -----------
      // Radar chart
      //------------
      var radarData = {
          labels: [
              "Optimising the Student Learning Experience at DCU",
              "Student Life at DCU",
              "Enhancing student life",
              "Participation in education",
              "An Ghaeilge i DCU"
          ],
          datasets: [{
                  label: "Staff participation",
                  backgroundColor: "rgba(237,61,150, .4)",
                  borderColor: "rgba(237,61,150, .8)",
                  pointBackgroundColor: "rgba(237,61,150, .4)",
                  pointBorderColor: "rgba(237,61,150, .8)",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "rgba(179,181,198,1)",
                  data: radarDataset[0],
                  pointRadius: 5,
                  pointHoverRadius: 5
              },
              {
                  label: "Student participation",
                  backgroundColor: "rgba(117, 192, 68, .4)",
                  borderColor: "rgba(117, 192, 68, .8)",
                  pointBackgroundColor: "rgba(117, 192, 68, .4)",
                  pointBorderColor: "rgba(117, 192, 68, .8)",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "rgba(179,181,198,1)",
                  data: radarDataset[1],
                  pointRadius: 5,
                  pointHoverRadius: 5
              },
              {
                  label: "Other participation",
                  backgroundColor: "rgba(242, 174, 49, .4)",
                  borderColor: "rgba(242, 174, 49, .8)",
                  pointBackgroundColor: "rgba(242, 174, 49, .4)",
                  pointBorderColor: "rgba(242, 174, 49, .8)",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "rgba(179,181,198,1)",
                  data: radarDataset[2],
                  pointRadius: 5,
                  pointHoverRadius: 5
              }
          ]
      };

      var radarOptions = {
          title: {
            display: false,
            text: 'Some text',
            fontSize: 14,
            padding: 10
          },
          legend: {
            display: true,
            labels: {
              fontSize: 14,
              padding: 12
            }
          },
          tooltips: {
            enable: true
          },
          elements: {
            line: {
              borderWidth: 3
            },
            point: {
              radius: 5
            },
            rectangle: {},

          },
          ticks: {
            beginAtZero: true
          },
          scale: {
            scaleLabel: {
            },
            pointLabels: {
              fontSize: 15,
            }
          }
      }
      var radar = document.getElementById("radarChart");
      radarChart = new Chart(radar, {
          type: 'radar',
          data: radarData,
          options: radarOptions,
      });



      // ----------
      // Bar Chart
      //-----------
      var barData = {
          labels: [
            "Academic staff",
            "Professional staff",
            "Undergraduate student",
            "Postgraduate student",
            "PhD student",
            "Alumnus",
            "Partner",
            "Friend",
            "Guest",
            "Other"
          ],
          datasets: [{
            backgroundColor: [
              'rgba(237,61,150, .6)',
              'rgba(117, 192, 68, .6)',
              'rgba(255, 242, 0, .6)',
              'rgba(103, 0, 133, .6)',
              'rgba(237,42,40, .6)',
              'rgba(7,140,93, .6)',
              'rgba(120,111,144, .6)',
              'rgba(1,166,210, .6)',
              'rgba(23,41,84, .6)',
              'rgba(242, 174, 49, .6)'
            ],
            borderColor: [
              'rgba(237,61,150, 1)',
              'rgba(117, 192, 68, 1)',
              'rgba(255, 242, 0, 1)',
              'rgba(103, 0, 133, 1)',
              'rgba(237,42,40, 1)',
              'rgba(7,140,93, 1)',
              'rgba(120,111,144, 1)',
              'rgba(1,166,210, 1)',
              'rgba(23,41,84, 1)',
              'rgba(242, 174, 49, 1)'
            ],
            borderWidth: 1,
            data: datasetpercentage,
          }]
      };

      var barOptions = {
          title: {
            display: true,
            fontSize: 14,
            padding: 10
          },
          legend: {
            display: false,
            labels: {
              fontSize: 14,
              padding: 12
            }
          },
          tooltips: {
            enable: true
          },
          elements: {
            line: {
              borderWidth: 3
            },
            point: {
              radius: 7
            },
            rectangle: {},

          },
          ticks: {
            beginAtZero: true
          },
          scale: {
            scaleLabel: {
              display: true,
              fontSize: 14
            },
            pointLabels: {
            }
          }
      }
      //radarChart.Radar(radarData, radarOptions);
      var bar = document.getElementById("barChart");
      barChart = new Chart(bar, {
          type: 'bar',
          data: barData,
          options: barOptions,
      });



      //---------
      // Pi
      //---------
      var piData = {
          labels: [
            "Academic staff",
            "Professional staff",
            "Undergraduate student",
            "Postgraduate student",
            "PhD student",
            "Alumnus",
            "Partner",
            "Friend",
            "Guest",
            "Other"
          ],
          datasets: [{
            hoverBackgroundColor: [
              'rgba(237,61,150, 1)',
              'rgba(117, 192, 68, 1)',
              'rgba(255, 242, 0, 1)',
              'rgba(103, 0, 133, 1)',
              'rgba(237,42,40, 1)',
              'rgba(7,140,93, 1)',
              'rgba(120,111,144, 1)',
              'rgba(1,166,210, 1)',
              'rgba(23,41,84, 1)',
              'rgba(242, 174, 49, 1)'
            ],
            backgroundColor: [
              'rgba(237,61,150, .8)',
              'rgba(117, 192, 68, .8)',
              'rgba(255, 242, 0, .8)',
              'rgba(103, 0, 133, .8)',
              'rgba(237,42,40, .8)',
              'rgba(7,140,93, .8)',
              'rgba(120,111,144, .8)',
              'rgba(1,166,210, .8)',
              'rgba(23,41,84, .8)',
              'rgba(242, 174, 49, .8)'
            ],
            data: dataset,
          }]
      };

      var piOptions = {
          cutoutPercentage: 50
      }
      //radarChart.Radar(radarData, radarOptions);
      var pi = document.getElementById("piChart");
      var piChart = new Chart(pi, {
          type: 'doughnut',
          data: piData,
          options: piOptions,
      });


      // ----------
      // Line chart
      // ----------
      var lineData = {
        labels: ["Start", "20 minutes", "40 minutes", "60 minutes", "80 minutes", "100 minutes", "120 minutes", "+120 minutes"],
        datasets: [
            {
                label: "Academic Staff",
                fill: false,
                responsive: false,
                lineTension: 0.1,
                backgroundColor: "rgba(237,61,150,1)",
                borderColor: "rgba(237,61,150,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(237,61,150,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(237,61,150,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: lineDataset[0],
                spanGaps: false,
            },
            {
                label: "Professional Staff",
                fill: false,
                responsive: false,
                lineTension: 0.1,
                backgroundColor: "rgba(113,191,69,1)",
                borderColor: "rgba(113,191,69,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(113,191,69,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(113,191,69,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: lineDataset[1],
                spanGaps: false,
            },
            {
                label: "Undergraduate",
                fill: false,
                responsive: false,
                lineTension: 0.1,
                backgroundColor: "rgba(255, 242, 0, 1)",
                borderColor: "rgba(255, 242, 0, 1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(255, 242, 0, 1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(255, 242, 0, 1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: lineDataset[2],
                spanGaps: false,
            },
            {
                label: "Postgraduate",
                fill: false,
                responsive: false,
                lineTension: 0.1,
                backgroundColor: "rgba(103, 0, 133, 1)",
                borderColor: "rgba(103, 0, 133, 1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(103, 0, 133, 1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(103, 0, 133, 1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: lineDataset[3],
                spanGaps: false,
            },
            {
                label: "Other",
                fill: false,
                responsive: false,
                lineTension: 0.1,
                backgroundColor: "rgba(242, 174, 49, 1)",
                borderColor: "rgba(242, 174, 49, 1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(242, 174, 49, 1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(242, 174, 49, 1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: lineDataset[4],
                spanGaps: false,
            }
      ]};
      var lineOptions = {
          title: {
            display: false,
            text: 'Some text',
            fontSize: 14,
            padding: 10
          },
          legend: {
            display: true,
            labels: {
              fontSize: 14,
              padding: 12
            }
          },
          tooltips: {
            enable: true
          },
          elements: {
            line: {
              borderWidth: 3
            },
            point: {
              radius: 7
            },
            rectangle: {},

          },
          ticks: {
            beginAtZero: true
          },
          scale: {
            scaleLabel: {
              display: true,
              fontSize: 14
            },
            pointLabels: {
            }
          }
      }
      var line = document.getElementById("lineChart");
      var lineChart = new Chart(line, {
        type: 'line',
        data: lineData,
        options: lineOptions
      });
    });
