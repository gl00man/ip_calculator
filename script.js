function Main()
{
  var ip = document.getElementById('ipAdress').value;
  var address = ip.split(".");
  var fullAddr = []
  for(i = 0; i < address.length; i++)
  {
    fullAddr.push(ConvertToBinary(address[i]));
  }
  fullAddr.reverse();
  var ready = fullAddr.join('.');
  document.getElementById('decAddresTh').innerHTML = ready;
}

function ConvertToBinary(num)
{
  readyNum = [];
  while(num > 0)
  {
    readyNum.push(num % 2);
    num = num / 2;
  }
  return readyNum.reverse().toString();
}
