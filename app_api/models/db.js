var mongoose = require('mongoose');
//var dbURI = 'mongodb://localhost/mekan32';
var dbURI = 'mongodb+srv://omerada:13579ada@cluster0.bsikr.mongodb.net/mekan32?retryWrites=true&w=majority'
mongoose.connect(dbURI, { 
  useNewUrlParser: true, 
  useFindAndModify: false, 
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', function () {
  //console.log('Mongoose ' + dbURI + ' adresindeki veritabanına bağlandı');
  console.log('Mongoose veritabanına bağlandı');
});

//Bağlantı hatası olduğunda konsola hata bilgisini yazdırır
mongoose.connection.on('error', function (err) {
  console.log('Mongoose bağlantı hatası\n: ' + err);
});

//Bağlantı kesildiğinde konsola kesilme bilgisini yazdır
mongoose.connection.on('disconnected', function () {
  console.log('\nMongoose bağlantısı kesildi');
});

kapat = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose kapatıldı\n' + msg);
    callback();
  });
};

// nodemon kullanıyorsak ayrı bir kapatma işlemi gerekir, kapatılma bilgisini yazdır
process.once('SIGUSR2', function () {
  kapat('Nodemon kapatıldı\n', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// Uygulama kapandığında kapatılma bilgisini yazdır
process.on('SIGINT', function () {
  kapat('Uygulama kapatıldı\n', function () {
    process.exit(0);
  });
});

// Herokudan kapatma işlemi gerçekleşirse kapatılma bilgisini yazdır
process.on('SIGTERM', function () {
  kapat('Heroku kapatıldı\n', function () {
    process.exit(0);
  });
});

require('./mekansema');