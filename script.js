function Main()
{
  var input = document.getElementById('ipAddress').value;
  if(input != " " && input != "")
  {
  var ip = FillIpAdress(input);
  var mask = FillMask(input);
  FillNetAddr(ip, mask);
  FillBroadAddr(ip, mask);
  }
}

function FillIpAdress(ip)
{
  var address = ip.split(".");
  var fullAddr = []
  for(i = 0; i < address.length; i++)
  {
    fullAddr.push(ConvertToBinary(Number(address[i])).join(""));
  }
  var ready = (fullAddr.join(".")).replace(",", "");
  document.getElementById('decAddressTh').innerHTML = ip;
  document.getElementById('binAddressTh').innerHTML = ready;
  return ready;
}

function FillMask(ip)
{
  var ip = document.getElementById('ipAddress').value;
  if(Number(ip.split(".")[0]) >= 1 && Number(ip.split(".")[0]) <= 126)
  {
    var mask = "11111111.00000000.00000000.00000000";
    document.getElementById('decMaskTh').innerHTML = "255.0.0.0";
    document.getElementById('binMaskTh').innerHTML = "11111111.00000000.00000000.00000000";
    return mask;
  }
  else if(Number(ip.split(".")[0]) >= 128 && Number(ip.split(".")[0]) <= 191)
  {
    var mask = "11111111.11111111.00000000.00000000";
    document.getElementById('decMaskTh').innerHTML = "255.255.0.0";
    document.getElementById('binMaskTh').innerHTML = "11111111.11111111.000000000.000000000";
    return mask;
  }
  else if(Number(ip.split(".")[0]) >= 192 && Number(ip.split(".")[0]) <= 223)
  {
    var mask = "11111111.11111111.11111111.00000000";
    document.getElementById('decMaskTh').innerHTML = "255.255.255.0";
    document.getElementById('binMaskTh').innerHTML = "11111111.11111111.11111111.000000000";
    return mask;
  }
  else if(Number(ip.split(".")[0]) > 223)
  {
    document.getElementById('decMaskTh').innerHTML = "-";
    document.getElementById('binMaskTh').innerHTML = "-";
  }
}

function ConvertToBinary(num)
{
  readyNum = [];
  while(num > 0)
  {
    readyNum.push(num % 2);
    num = num / 2;
    num = Number((num.toString()).split(".")[0])
  }
  var arrayLength = readyNum.length;
  if(arrayLength < 8)
  {
    for(j = 1; j <= 8 - arrayLength; j++)
    {
        readyNum.push(0);
    }
  }
  return readyNum.reverse();
}

function ConvertAddressToDecimal(addr)
{
  var addr = addr.split(".");
  var rAddr = [];
  for(i = 0; i <= addr.length; i++)
  {
    rAddr.push((parseInt(addr[i], 2)).toString() + ".");
  }
  return rAddr;
}

function FillNetAddr(ip, mask)
{
	var ip = ip.split('');
	var mask = mask.split('');
	var NetAddr = [];

	for(i = 0; i<=ip.length; i++)
	{
		if(ip[i] != ".")
		{
			if(i%9 ==0)
			{
				NetAddr.push(".")
			}
			NetAddr.push(ip[i] * mask[i]);
		}
	}
	delete NetAddr[0];
	NetAddr.splice(-1,1);
	document.getElementById("binNettAddr").innerHTML = NetAddr.join("");
  var addr = ConvertAddressToDecimal(NetAddr.join("")).join("").replace(",", "");
  document.getElementById("decNettAddr").innerHTML = addr.substring(0, addr.length - 5);
}

function FillBroadAddr(ip, mask)
{
	var ip = ip.split('');
	var mask = mask.split('');
	var Broad = []

	for(i = 0; i<=ip.length; i++)
	{
		if(i%9 ==0 )
		{
			Broad.push(".")
		}

		if(ip[i] != ".")
		{
			if(mask[i] == "1")
			{
				Broad.push(ip[i]);

			}
			else if(mask[i] == "0")
			{

				Broad.push("1");
			}
		}

	}
	delete Broad[0];
	document.getElementById("binBroad").innerHTML = Broad.join("");
  var addr = ConvertAddressToDecimal(Broad.join("")).join("").replace(",", "");
  document.getElementById("decBroad").innerHTML = addr.substring(0, addr.length - 5);
}
