const doku = require('../index');
const CreateVARequestDto = require('../_models/createVaRequestDto');
const AdditionalInfo = require('../_models/additionalInfo');
const TotalAmount = require('../_models/totalAmount');
const VirtualAccountConfig = require('../_models/virtualAccountConfig');
let privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvuA0S+R8RGEoT
xZYfksdNam3/iNrKzY/RqGbN4Gf0juIN8XnUM8dGv4DVqmXQwRMMeQ3N/Y26pMDJ
1v/i6E5BwWasBAveSk7bmUBQYMURzxrvBbvfRNvIwtYDa+cx39HamfiYYOHq4hZV
S6G2m8SqDEhONxhHQmEP9FPHSOjPQWKSlgxrT3BKI9ESpQofcxKRX3hyfh6MedWT
lZpXUJrI9bd6Azg3Fd5wpfHQlLcKSR8Xr2ErH7dNS4I21DTHR+6qx02Tocv5D30O
DamA6yG9hxnFERLVE+8GnJE52Yjjsm5otGRwjHS4ngSShc/Ak1ZyksaCTFl0xEwT
J1oeESffAgMBAAECggEAHv9fxw4NTe2z+6LqZa113RE+UEqrFgWHLlv/rqe8jua5
t+32KNnteGyF5KtHhLjajGO6bLEi1F8F51U3FKcYTv84BnY8Rb1kBdcWAlffy9F2
Fd40EyHJh7PfHwFk6mZqVZ69vNuyXsX9XJSX9WerHLhH9QxBCykJiE/4i3owH4dF
Cd/7ervsP32ukGY3rs/mdcO8ThAWffF5QyGd/A3NMf8jRCZ3FwYfEPrgaj9IHV2f
UrwgVc7JqQaCJTvvjrm4Epjp+1mca036eoDj40H+ImF9qQ80jZee/vvqRXjfU5Qx
ys/MHD6S2aGEG5N5VnEuHLHvT51ytTpKA+mAY/armQKBgQDrQVtS8dlfyfnPLRHy
p8snF/hpqQQF2k1CDBJTaHfNXG37HlccGzo0vreFapyyeSakCdA3owW7ET8DBiO5
WN2Qgb7Vab/7vEiGltK4YU/62+g4F0LjWPp25wnbVj81XXW95QrWKjytjU/tgO2p
h47qr8C+3HqMPj1pQ5tcKpJXCwKBgQC/Nrkn0kT+u4KOxXix5RkRDxwfdylCvuKc
3EfMHFs4vELi1kOhwXEbVTIsbFpTmsXclofqZvjkhepeu9CM6PN2T852hOaI+1Wo
4v57UTW/nkpyo8FZ09PtBvOau5B6FpQU0uaKWrZ0dX/f0aGbQKUxJnFOq++7e7mi
IBfX1QCm/QKBgHtVWkFT1XgodTSuFji2ywSFxo/uMdO3rMUxevILVLNu/6GlOFnd
1FgOnDvvtpLCfQWGt4hTiQ+XbQdy0ou7EP1PZ/KObD3XadZVf8d2DO4hF89AMqrp
3PU1Dq/UuXKKus2BJHs+zWzXJs4Gx5IXJU/YMB5fjEe14ZAsB2j8UJgdAoGANjuz
MFQ3NXjBgvUHUo2EGo6Kj3IgxcmWRJ9FzeKNDP54ihXzgMF47yOu42KoC+ZuEC6x
xg4Gseo5mzzx3cWEqB3ilUMEj/2ZQhl/zEIwWHTw8Kr5gBzQkv3RwiVIyRf2UCGx
ObSY41cgOb8fcwVW1SXuJT4m9KoW8KDholnLoZECgYEAiNpTvvIGOoP/QT8iGQkk
r4GK50j9BoPSJhiM6k236LSc5+iZRKRVUCFEfyMPx6AY+jD2flfGxUv2iULp92XG
2eE1H6V1gDZ4JJw3s5847z4MNW3dj9nIi2bpFssnmoS5qP2IpmJW0QQmRmJZ8j2j
OrzKGlO90/6sNzIDd2DbRSM=
-----END PRIVATE KEY-----`
let clientID = 'BRN-0221-1693209567392'
let snap;

function initializeSnap() {
    snap = new doku.Snap({
        isProduction : false,
        privateKey : privateKey,
        clientID : clientID
    });
}

async function start(){
    initializeSnap();

    
    let createVaRequestDto = new CreateVARequestDto()
    
    createVaRequestDto.partnerServiceId = "    1899";
    createVaRequestDto.customerNo = null;
    createVaRequestDto.virtualAccountNo = null;
    
    createVaRequestDto.virtualAccountName = "T_"+Date.now();
    createVaRequestDto.virtualAccountEmail = "test.bnc."+Date.now()+"@test.com";
    createVaRequestDto.virtualAccountPhone = "00000062"+Date.now(),"INV_CIMB_"+Date.now();
    createVaRequestDto.trxId = "INV_CIMB_"+Date.now();

    let totalAmount = new TotalAmount();
    totalAmount.value = "12500.00";
    totalAmount.currency = "IDR";

    createVaRequestDto.totalAmount = totalAmount;

    let virtualAccountConfig = new VirtualAccountConfig();
    virtualAccountConfig.reusableStatus = false;

    let additionalInfo = new AdditionalInfo("VIRTUAL_ACCOUNT_BANK_CIMB", virtualAccountConfig);
    additionalInfo.channel = "VIRTUAL_ACCOUNT_BANK_CIMB";
    additionalInfo.virtualAccountConfig = virtualAccountConfig;
    createVaRequestDto.additionalInfo = additionalInfo;
    createVaRequestDto.virtualAccountTrxType = "1";
    createVaRequestDto.expiredDate = "2024-05-22T09:54:04+07:00";


    await snap.createVa(createVaRequestDto).then(va=>{
        console.log(va)
    })

}

start();