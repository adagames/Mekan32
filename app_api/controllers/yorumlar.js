var mongoose=require('mongoose')
var Mekan=mongoose.model('mekan')
const cevapOlustur=function(res,status,content){
res
  .status(status)
  .json(content)

}


const yorumEkle=function(req, res) {
 cevapOlustur(res,200,{"durum":"basarili"});
}

const yorumGetir=function(req, res) {
            //yorumid parametresi var mı kontrol et
            if (req.params && req.params.mekanid && req.params.yorumid){
                Mekan.findById(req.params.mekanid)
                //sadece mekan adının ve mekanın yorumlarını getir
                .select('ad yorumlar')
                .exec(function(hata, mekan){
                    var cevap, yorum;
                    if(!mekan) {
                      cevapOlustur (res, 404, {
                          "mesaj": "mekanid bulunamadı"
                      });
                      return;
                    }else if(hata) {
                      cevapOlustur(res, 400, hata);
                      return;
                    }//mekana ait yorum var mı?
                    if (mekan.yorumlar && mekan.yorumlar.length > 0){
                        //verilen yorumid ye uygun yorum var mı?
                        yorum = mekan.yorumlar.id(req.params.yorumid);
                        //yoksa hata mesajı ver
                        if (!yorum) {
                            cevapOlustur (res, 404, {
                              "mesaj": "yorumid bulunamadı"
                            });
                        }//varsa cevap nesnesi döndür.içine mekan adı, idsi ve yorumu ekle
                        else {
                          cevap= {
                              mekan : {
                                  ad : mekan,ad,
                                  id : req.params.mekanid
                              },
                              yorum : yorum
                          };
                          cevapOlustur (res, 200, cevap);
                        }
                    }else {
                        cevapOlustur (res, 404, {
                            "mesaj": "Hiç yorum yok"
                        });
                    }
                }
                );
            } else {
              cevapOlustur(res, 404, {
                  "mesaj": "Bulunamadı. mekanid ve yorumid mutlaka girilmeli."
              });
            }
 //cevapOlustur(res,200,{"durum":"basarili"});
}

const yorumGuncelle=function(req, res) {
 cevapOlustur(res,200,{"durum":"basarili"});
}

const yorumSil=function(req, res) {
 cevapOlustur(res,200,{"durum":"basarili"});
}

module.exports={
yorumEkle,
yorumGetir,
yorumSil,
yorumGuncelle
}