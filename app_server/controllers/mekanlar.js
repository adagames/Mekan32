var request = require('postman-request');
var footer = 'Ömer Ada 2021'

var apiSecenekleri = {
  sunucu : 'https://omerada1811012011.herokuapp.com/',
  apiYolu : '/api/mekanlar/'
};

var mesafeyiFormatla = function(mesafe) {
  var yeniMesafe, birim;
  if (mesafe > 1000) {
    yeniMesafe = parseFloat(mesafe/1000).toFixed(2);
    birim = 'km';
  } else {
    yeniMesafe = parseFloat(mesafe).toFixed(1);
    birim = ' m';
  }
  return yeniMesafe + birim;
}

var anasayfaOlustur = function(req, res, cevap, mekanListesi) {
  var mesaj;
  // gelen mekanlarListesi eğer dizi tipinde değilse hata ver
  if (!(mekanListesi instanceof Array)) {
    mesaj = 'API HATASI: Bir şeyler ters gitti.';
    mekanListesi = [];
  } else { // eğer belirlenen mesafe içinde bulunamadıysa bilgilendir
    if (!mekanListesi.length) {
      mesaj = 'Civarda Herhangi Bir Mekan Bulunamadı!';
    }
  }

  res.render('mekanlar-liste', { 
    title : 'Mekan Bul',
    sayfaBaslik : {
      siteAd : 'Mekan 32',
      aciklama : 'Isparta civarındaki mekanları keşfedin!'
    },
    footer : footer,
    mekanlar: mekanListesi,
    mesaj: mesaj,
    cevap: cevap
  });
}

const anaSayfa = function(req, res, next) {
  istekSecenekleri = {
    url : apiSecenekleri.sunucu + apiSecenekleri.apiYolu, // tam yol
    method : 'GET', // veri çekeceğimiz için GET methodunu kullan
    json : {}, // dönen veri json formatında olacak
    // sorgu parametreleri. URL'de yazılan enlem ve boylamı al
    // localhost:3000/?enlem=37.7&boylam=30.5 gibi
    qs : {
      enlem : req.query.enlem,
      boylam : req.query.boylam
    }
  };
  
  // istekte bulun
  request(istekSecenekleri, 
    // geri dönüş methodu (callback function)
    function(hata, cevap, mekanlar) {
      var i, gelenMekanlar;
      gelenMekanlar = mekanlar;
      // sadece 200 durum kodunda ve mekanlar doluyken işlem yap
      if (!hata && gelenMekanlar.length) {
        for (i = 0; i < gelenMekanlar.length; i++) {
          gelenMekanlar[i].mesafe = mesafeyiFormatla(gelenMekanlar[i].mesafe);
        }
      }
      anasayfaOlustur(req, res, cevap, gelenMekanlar);
    }
  );
}

var detaySayfasiOlustur = function(req, res, mekanDetaylari) {
  res.render('mekan-detay', { 
    title : mekanDetaylari.ad,
    sayfaBaslik : mekanDetaylari.ad,
    mekanBilgisi : mekanDetaylari,
    footer: footer
  });
}

var hataGoster = function(req, res, durum) {
  var baslik, icerik
  if (durum == 404) {
    baslik = '404, Sayfa Bulunamadı!'
    icerik = 'Aradığınız sayfayı bulamadık!'
  } else {
    baslik = durum + 'Bir şeyler ters gitti!'
    icerik = 'Ters giden bir şey var!'
  }

  res.status(durum);
  res.render('error', {
    baslik: baslik,
    icerik: icerik,
    footer: footer
  });
}

const mekanBilgisi = function(req, res, next) {
  istekSecenekleri = {
    url : apiSecenekleri.sunucu + apiSecenekleri.apiYolu + req.params.mekanid,
    method : 'GET',
    json : {}
  };

  request(istekSecenekleri, function(hata, cevap, mekanDetaylari) {
    var gelenMekan = mekanDetaylari;
    // eğer statusCode 200 ise bilgi vardır
    if (cevap.statusCode == 200) {
      // enlem ve boylam bir dizi şeklinde geliyor, bunu ayır
      gelenMekan.koordinatlar = {
        enlem: mekanDetaylari.koordinatlar[0],
        boylam: mekanDetaylari.koordinatlar[1]
      };
      detaySayfasiOlustur(req, res, gelenMekan);
    } else {
      hataGoster(req, res, cevap.statusCode);
    }
  });
}

const yorumEkle = function(req, res, next) {
  res.render('yorum-ekle', { 
    title : 'Yorum Ekle',
    footer : footer
  });
}


module.exports = {
  anaSayfa,
  mekanBilgisi, 
  yorumEkle
}