function Main() {
    var input = document.getElementById('ipAddress').value;
    if (input != " " && input != "") {
        var ip = FillIpAddress(input);
        var mask = FillMask(input);
        var Rtrnet = FillNetAddr(ip, mask);
        FillBroadAddr(ip, mask);
        Netho(ip, mask);
        Frstho(Rtrnet);
        Lstho(Rtrnet);
    }
}

function FillIpAddress(ip) {
    var address = ip.split(".");
    var fullAddr = []
    for (i = 0; i < address.length; i++) {
        fullAddr.push(ConvertToBinary(Number(address[i])).join(""));
    }
    var ready = (fullAddr.join(".")).replace(",", "");
    document.getElementById('decAddressTh').innerHTML = ip;
    document.getElementById('binAddressTh').innerHTML = ready;
    return ready;
}

function FillMask(ip) {
    var ip = document.getElementById('ipAddress').value;
    if (Number(ip.split(".")[0]) >= 1 && Number(ip.split(".")[0]) <= 126) {
        var mask = "11111111.00000000.00000000.00000000";
        document.getElementById('decMaskTh').innerHTML = "255.0.0.0";
        document.getElementById('binMaskTh').innerHTML = "11111111.00000000.00000000.00000000";
        return mask;
    } else if (Number(ip.split(".")[0]) >= 128 && Number(ip.split(".")[0]) <= 191) {
        var mask = "11111111.11111111.00000000.00000000";
        document.getElementById('decMaskTh').innerHTML = "255.255.0.0";
        document.getElementById('binMaskTh').innerHTML = "11111111.11111111.00000000.00000000";
        return mask;
    } else if (Number(ip.split(".")[0]) >= 192 && Number(ip.split(".")[0]) <= 223) {
        var mask = "11111111.11111111.11111111.00000000";
        document.getElementById('decMaskTh').innerHTML = "255.255.255.0";
        document.getElementById('binMaskTh').innerHTML = "11111111.11111111.11111111.00000000";
        return mask;
    } else if (Number(ip.split(".")[0]) > 223) {
        document.getElementById('decMaskTh').innerHTML = "-";
        document.getElementById('binMaskTh').innerHTML = "-";
    }
}

function ConvertToBinary(num) {
    readyNum = [];
    while (num > 0) {
        readyNum.push(num % 2);
        num = num / 2;
        num = Number((num.toString()).split(".")[0])
    }
    var arrayLength = readyNum.length;
    if (arrayLength < 8) {
        for (j = 1; j <= 8 - arrayLength; j++) {
            readyNum.push(0);
        }
    }
    return readyNum.reverse();
}

function ConvertAddressToDecimal(addr) {
    var addr = addr.split(".");
    var rAddr = [];
    for (i = 0; i <= addr.length; i++) {
        rAddr.push((parseInt(addr[i], 2)).toString() + ".");
    }
    return rAddr;
}

function FillNetAddr(ip, mask) {
    var ip = ip.split('');
    var mask = mask.split('');
    var NetAddr = [];

    for (i = 0; i <= ip.length; i++) {
        if (ip[i] != ".") {
            if (i % 9 == 0) {
                NetAddr.push(".")
            }
            NetAddr.push(ip[i] * mask[i]);
        }
    }
    delete NetAddr[0];
    NetAddr.splice(-1, 1);
    document.getElementById("binNettAddr").innerHTML = NetAddr.join("");
    var addr = ConvertAddressToDecimal(NetAddr.join("")).join("").replace(",", "");
    document.getElementById("decNettAddr").innerHTML = addr.substring(0, addr.length - 5);
    return addr;
}

function FillBroadAddr(ip, mask) {
    var ip = ip.split('');
    var mask = mask.split('');
    var Broad = []

    for (i = 0; i <= ip.length; i++) {
        if (i % 9 == 0) {
            Broad.push(".")
        }

        if (ip[i] != ".") {
            if (mask[i] == "1") {
                Broad.push(ip[i]);

            } else if (mask[i] == "0") {

                Broad.push("1");
            }
        }

    }
    delete Broad[0];
    document.getElementById("binBroad").innerHTML = Broad.join("");
    var addr = ConvertAddressToDecimal(Broad.join("")).join("").replace(",", "");
    document.getElementById("decBroad").innerHTML = addr.substring(0, addr.length - 5);
}

function Netho(ip, mask) {

    var ip32 = 32;
    var mask = mask.split('')
    var count = 0;

    for (a = 0; a <= mask.length; a++) {
        if (mask[a] == "1") {
            count += 1;
        }
    }
    var shrt = ip32 - count;
    var neth0st = 2 ** shrt - 2;
    document.getElementById("neth0st").innerHTML = neth0st;
    document.getElementById("binneth0st").innerHTML = ConvertToBinary(neth0st).join("");
}

function Frstho(Frsth0) {
    var ddd = Frsth0.split(".")

    ddd.splice(-2, 2);


    var paseit = Number(ddd[3]);
    var a = paseit + 1;

    ddd.splice(-1, 1);
    ddd.push(a);
    var ddd1 = ddd.join(".")

    document.getElementById("firstho").innerHTML = ddd1;

    var tbl = [];
    for (i = 0; i < ddd1.split(".").length; i++) {
        tbl.push(ConvertToBinary(Number(ddd1.split(".")[i])).join(""));
    }
    document.getElementById("binfirstho").innerHTML = tbl.join(".");
}

function Lstho(Lstho, tobinary) {
    var ipip = Lstho.split(".");

    ipip.splice(-3, 3);
    var tff = 254
    ipip.push(tff);
    var ipip1 = ipip.join(".")

    document.getElementById("lstho").innerHTML = ipip1;

    var tbl = [];
    for (i = 0; i < ipip1.split(".").length; i++) {
        tbl.push(ConvertToBinary(Number(ipip1.split(".")[i])).join(""));
    }
    document.getElementById("binlstho").innerHTML = tbl.join(".");
}