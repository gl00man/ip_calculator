function Main()
{
  var input = document.getElementById('ipAddress').value
  if(input != " " && input != "")
  {
  FillIpAdress(input);
  FillMask(input);
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
}

function FillMask(ip)
{
  var ip = document.getElementById('ipAddress').value;
  if(Number(ip.split(".")[0]) >= 1 && Number(ip.split(".")[0]) <= 126)
  {
    document.getElementById('decMaskTh').innerHTML = "255.0.0.0";
    document.getElementById('binMaskTh').innerHTML = "11111111.0.0.0";
  }
  else if(Number(ip.split(".")[0]) >= 128 && Number(ip.split(".")[0]) <= 191)
  {
    document.getElementById('decMaskTh').innerHTML = "255.255.0.0";
    document.getElementById('binMaskTh').innerHTML = "11111111.11111111.0.0";
  }
  else if(Number(ip.split(".")[0]) >= 192 && Number(ip.split(".")[0]) <= 223)
  {
    document.getElementById('decMaskTh').innerHTML = "255.255.255.0";
    document.getElementById('binMaskTh').innerHTML = "11111111.11111111.11111111.0";
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
