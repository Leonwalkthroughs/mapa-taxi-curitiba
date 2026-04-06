var map = L.map('map').setView([-25.4284, -49.2733], 13);

// Mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Mapa © OpenStreetMap'
}).addTo(map);

// Ícone de táxi
var taxiIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
    iconSize: [30, 30]
});

// Gerar pontos
var pontos = [];

for (let i = 0; i < 300; i++) {
    let lat = -25.4284 + (Math.random() - 0.5) * 0.1;
    let lng = -49.2733 + (Math.random() - 0.5) * 0.1;

    pontos.push({
        nome: "Ponto de Táxi " + (i + 1),
        lat,
        lng
    });
}

var markers = [];

// Adicionar no mapa
pontos.forEach(p => {
    let marker = L.marker([p.lat, p.lng], {icon: taxiIcon})
        .addTo(map)
        .bindPopup("<b>" + p.nome + "</b>");

    markers.push({marker, nome: p.nome.toLowerCase()});
});

// 🔎 Busca
document.getElementById("search").addEventListener("input", function(e) {
    let texto = e.target.value.toLowerCase();

    markers.forEach(m => {
        if (m.nome.includes(texto)) {
            m.marker.addTo(map);
        } else {
            map.removeLayer(m.marker);
        }
    });
});

// 📍 Localização do usuário
function localizar() {
    map.locate({setView: true, maxZoom: 16});

    map.on('locationfound', function(e) {
        L.marker(e.latlng)
            .addTo(map)
            .bindPopup("Você está aqui")
            .openPopup();
    });
}

// 🔄 Reset
function resetMap() {
    map.setView([-25.4284, -49.2733], 13);
}
