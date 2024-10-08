(function() {
    const lat = document.querySelector("#lat").value || 20.67444163271174;
    const lng = document.querySelector("#lng").value ||-103.38739216304566;
    const map = L.map('map').setView([lat, lng ], 16);
    let marker;
    
    const geoService=L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker=new L.marker([lat,lng],{
        draggable:true,
        autPan:true
    }).addTo(map)
    marker.on("moveend",function(e){
        marker=e.target

        const position=marker.getLatLng();
        map.panTo(new L.LatLng(position.lat,position.lng))

        geoService.reverse().latlng(position,13).run(function(err,res){
            marker.bindPopup(res.address.LongLabel)

            document.querySelector(".street").textContent=res?.address?.Address ?? ""
            document.querySelector("#street").value=res?.address?.Address ?? ""
            document.querySelector("#lat").value=res?.latlng?.lat?? "" 
            document.querySelector("#lng").value=res?.latlng?.lng ?? ""
        })
    })

})()