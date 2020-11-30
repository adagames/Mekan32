
const anaSayfa = function(req, res, next) {
  res.render('mekanlar-liste',
    { title : 'Anasayfa',
      'sayfaBaslik' : {
        'siteAd' : 'Mekan 32',
        'aciklama' : 'Isparta civarındaki mekanları keşfedin!',
        'footertxt' : ' Ömer Ada 2020'
      },
      'mekanlar' : [
        {
          'ad' : 'Starbucks',
          'adres' : 'Centrum Garden',
          'puan' : '4',
          'imkanlar' : ['Kahve', 'Çay', 'Pasta'],
          'mesafe' : '10km'
        },
        {
          'ad' : 'Gloria Jeans',
          'adres' : 'Iyaş Avm',
          'puan' : '3',
          'imkanlar' : ['Kahve', 'Kek', 'Çay'],
          'mesafe' : '5km'
        },
        {
          'ad' : 'Köfteci Ömer',
          'adres' : 'Iyaş Avm',
          'puan' : '4',
          'imkanlar' : ['Iskender', 'Sulu Patates', 'Ayranlar'],
          'mesafe' : '7km'
        },
        {
          'ad' : 'HD Iskender',
          'adres' : 'Merkez',
          'puan' : '5',
          'imkanlar' : ['Iskender Cesitleri', 'Corbalar', 'Icecekler'],
          'mesafe' : '6km'
        },
        {
          'ad' : 'Künefeci',
          'adres' : 'Künefeciler Caddesi',
          'puan' : '5',
          'imkanlar' : ['Kahve', 'Künefeler', 'Çay', 'Elmalı Turtalar', 'Icecekler'],
          'mesafe' : '28km'
        }
      ]
    }
   );
}

const mekanBilgisi = function(req, res, next) {
  res.render('mekan-detay', 
    { title : 'Mekan Bilgisi',
      'sayfaBaslik' : 'Starbucks',
      'mekanBilgisi' : {
        'ad' : 'Starbucks',
        'adres' : 'Centrum Garden',
        'puan' : 3,
        'imkanlar' : ['Kahve', 'Çay', 'Pasta'],
        'koordinatlar' : {
          'enlem': '37.781885',
          'boylam' : '30.566034'
        },
        'saatler' : [
          {
            'gunler' : 'Pazartesi - Cuma',
            'acilis' : '7:00',
            'kapanis' : '23:00',
            'kapali' : false
          },
          {
            'gunler' : 'Cumartesi',
            'acilis' : '9:00',
            'kapanis' : '22:00',
            'kapali' : false
          },
          {
            'gunler' : 'Pazar',
            'kapali' : true
          }
        ],
        'yorumlar' : [
          {
            'yorumYapan' : 'Ömer Ada',
            'puan' : '3',
            'tarih' : '26.11.2020',
            'yorumMetni' : 'İlgisiz çalışanlar.'
          },
          {
            'yorumYapan' : 'Selami Kul',
            'puan' : '5',
            'tarih' : '27.11.2020',
            'yorumMetni' : 'Çeşit çok öneririm.'
          },
          {
            'yorumYapan' : 'Asım Sinan Yüksel',
            'puan' : '4',
            'tarih' : '30.11.2020',
            'yorumMetni' : 'Kahveleri güzel,yinsin,içilsin.'
          }
        ]
      }
    }
  );
}

const yorumEkle = function(req, res, next) {
  res.render('yorum-ekle', { title: 'Yorum Ekle' });
}
 
module.exports = {
  anaSayfa, 
  mekanBilgisi, 
  yorumEkle
}