var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);//name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */

      expect(productsICanEat.length).toBe(0);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<100; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(2318);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = 2318;    /* try chaining range() and reduce() */

    expect(2318).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(undefined);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {

      function getLargestPrimeFactor(n) {

        n = (n < 0 ? -n : n);//make n positive

        if(n < 3)
          return n;

        var d = 2;
        var pf = 2;

        while (n > 1)
        {
           while (n % d == 0)//divide by d until no longer possible
           {
             n /= d;
             pf = d;
           }

            d = d + 1
            if (d*d > n && n > 1)
            {
              pf = n;//only prime number left
              break;
            }
        }

        return pf
      }

     //non prime no  tests     
     expect(getLargestPrimeFactor(30)).toBe(5);
     expect(getLargestPrimeFactor(-100)).toBe(5);
     expect(getLargestPrimeFactor(100)).toBe(5);
     
     //prime no tests
     expect(getLargestPrimeFactor(13)).toBe(13);
     expect(getLargestPrimeFactor(101)).toBe(101);
  });


  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

     function isPalindrome(n) 
     {  
       if(n < 10)
        return false;

       var digits = [];//make array of digits(backwards, but not important)

       while (n> 9)//divide by d until no longer possible
       {
        var d = n%10;
        digits.push(d);
        n -= d;
        n /= 10;
       }
      digits.push(n);

      var cmpCnt = (digits.length - digits.length % 2) / 2;//max number of neecessary comparissons
      for (i = 0; i < cmpCnt; i+=1) 
      {
        if(digits[i] != digits[digits.length - i-1])
          return false;//not palindrome
      }
      
      return true;
     }

    function findLargestPalindrome() 
     {  
       var maxPali = 0;

       for (var i = 999; i > 99; i--) 
        {
          for (var j = 999; j > 99; j--) 
          {
            var mul = j*i;
            if(isPalindrome(mul) && mul > maxPali)
            {
                maxPali = mul;
            }
          }
        }

        return maxPali;
     }

  //tests for isPalindrome
  expect(isPalindrome(123)).toBe(false);
  expect(isPalindrome(123421)).toBe(false);
  expect(isPalindrome(121)).toBe(true);
  expect(isPalindrome(1221)).toBe(true);

  //test findLargestPalindrome
  expect(findLargestPalindrome()).toBe(906609);
  });

 function isPrimeNo(n) //need this one elsewhere also
     {
        if(n < 4)
          return true;

       for(i = 2; i < n; i++)
       {
        if( n % i == 0)
          return false;
       }

        return true
      }
      
  it("should find the smallest number divisible by each of the numbers 1 to 20", function () { 

     function findSmallestNo() 
     {  
      var primeNumbers = [];
      var primeNumberPow = [];
 
      //find mak pow of all prime numbers btw 1..20
       for (var i = 2; i < 21; i++) 
        {
         if(isPrimeNo(i))
         {
          //found a new prime no with initial pow of 1
          primeNumbers.push(i);
          primeNumberPow.push(1);
         }
         else//non prime numbers are a combination of prime ones(eg. 8 = 2^3, 12 = 2^2*3)... we need to determine the max power for each prime no
         {
          var n = i;
          for (j = 0;j < primeNumbers.length; j++) 
          {
            var pow = 0;
            while (n % primeNumbers[j] == 0)//divide by the prime number until no longer possible
             {
               n /= primeNumbers[j];
               pow++;
             }

             if(pow > primeNumberPow[j])
              primeNumberPow[j] = pow;
          }
         }
        }

        var smallestNo = 1;//do the math
        for (i = 0; i < primeNumbers.length; i++) 
        {
          smallestNo *= Math.pow(primeNumbers[i], primeNumberPow[i]);
        }

        return smallestNo;
     }

    //test
     expect(findSmallestNo()).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    //1^2+2^2+3^2+...+n^2 - (1+2+3+...+n)^2
     function diffSquares(n) 
     {
       var sumSqares = n*(n+1)*(2*n+1)/6;//1^2+2^2+3^2+...+n^2
       var squareSum = Math.pow(n*(n+1)/2,2);//(1+2+3+...+n)^2
       return sumSqares - squareSum;
     }

     //test
     expect(diffSquares(10)).toBe(-2640);

  });

  it("should find the 10001st prime", function () {

   function findPrime(n) 
   {
     var idx = 0;
     var cnt = 0;

     while(cnt != n)
     {
        idx++;

       if(isPrimeNo(idx))
          cnt++;
     }

     return idx;
   }

   //test
   expect(findPrime(5)).toBe(7);//1 2 3 5 7
   expect(findPrime(10001)).toBe(104729);
  });
  
});
