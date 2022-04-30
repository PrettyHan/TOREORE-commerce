const powerSet = function (str) {
    let result = [""]; //빈문자열은 미리 집어넣어놓기
    let subset = ""; 
    let check = {};
    function makeSubset() {
      //기저조건: 문자열에 있는 알파벳 모두 다 넣었을 때
      if (subset.length >= str.length) {
        return;
      }
    
      for (let i = 0; i < str.length; i++) {
        if (!check[str[i]]) {
          //1. 아직 subset에 안들어간 알파벳이면
          //str[i]가 한글자씩 들어감
          subset += str[i]; //2. 합치고
          check[str[i]] = true;
          //3. str[i]가 들어갔다고 표시해줘서 중복을 방지
          let sortSubset = subset.split("").sort().join("");
          // => 모든 부분집합의 문자들은 알파벳 순서로 정렬되어야 합니다.
          if (result.indexOf(sortSubset) === -1) {
            //3은 jjum 와 같은 알파벳 중복을 막아 준 것이고 이 코드는 jmup와 jpum 같은 중복을 없애기 위한 것이다.
            result.push(sortSubset);
          }
          makeSubset(); //4. 재귀 들어가서 그 뒤에 알파벳 덧붙이고
          subset = subset.slice(0, -1);
          //5-1. 재귀 빠져나오면 즉 기저조건에서 나오게 되면, 현재 subset은  "jump"이고 i = 4이다.
          //그리고 해당 코드를 통해 subset은 jum으로 바뀐다.
          //즉 순서대로 넣어주고 다시 뒤로 돌아가서 처음부터 중복제거해서 넣어주는 걸 반복한다고 생각하면 된다.
          check[str[i]] = false;
          //3번 부분을 다시 초기화.
        }
      }
    }
    makeSubset();
    return result;
  };

export { powerSet }