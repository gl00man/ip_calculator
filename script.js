function Main()
{
  var ip = document.getElementById('ipAddress').value;
  var address = ip.split(".");
  var fullAddr = []
  for(i = 0; i < address.length; i++)
  {
    fullAddr.push(ConvertToBinary(address[i]));
  }
  var ready = (fullAddr.join(".")).replace(",", "");
  document.getElementById('binAddressTh').innerHTML = ready;
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
