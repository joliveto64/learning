function needleHay(hay, need) {
  // new array of all 0s
  const cnt = [];
  for (let c = 0; c < hay.length; c++) cnt[c] = 0;

  for (let n = 0; n < need.length; n++) {
    console.log(`look at n=${n} (${need[n]})`);
    for (let h = 0; h < hay.length; h++) {
      console.log(`look at h=${h} (${hay[h]})`);
      // if (n !== cnt[h]) console.log('-skip it, already not matching / not a candidate');
      // else if (need[n] === hay[h+n]) console.log(`-matched, inc count to ${cnt[h]+1}`);
      // else console.log('-no match, moving to next hay character')

      if (cnt[h] !== -1 && need[n] === hay[h + n]) {
        cnt[h]++;

        if (cnt[h] === need.length) {
          console.log("-FINISHED MATCHING ENTIRE NEEDLE!");
          return h;
        }
      } else {
        cnt[h] = -1;
      }
    }
  }

  return -1;
}

// zta tc
// 020010

console.log(needleHay("ztreetree", "tree"));
//                     ^              ^ need[n] (n=3)
//                     hay[h+n]

//                     22210000000

// 1. listen
// 2. clarify. take string, convert to LC and remove all numbers, if it is the same forward and backward it is a plaindrome.
// example: mom > mom true
// cat > tac false

// 3. function sig
// function isPalindrome(string){
//   return true or false
// }

function sanitize(string) {
  return string;
}

function isPalindrome(string) {
  let sanitized = sanitize(string);
  let reversed = "";
  // loop over backwards to make new string
  for (let i = sanitized.length - 1; i >= 0; i--) {
    reversed += sanitized[i];
  }
  // if old string === new string true

  return sanitized === reversed;
  // {
  //   return true
  // } else {
  // // else false
  //   return false
  // }
}

function isPalindrome2(string) {
  let sanitized = sanitize(string);
  // loop over string
  // track last index

  const len = sanitized.length;
  for (let i = 0; i < len; i++) {
    // if not same false
    const oppositeIndex = len - i - 1;
    if (sanitized[i] !== sanitized[oppositeIndex]) {
      return false;
    }
  }

  j = sanitized.length - 1;
  for (let i = 0; i < sanitized.length; i++) {
    // if not same false
    if (sanitized[i] !== sanitized[j]) {
      return false;
    } else {
      // index-- on iteration
      j--;
    }
  }
  return true;
}

/*
  - tip: if making helper function + in an env where your code is actually runnable: make a no-op impl of that helper (eg function sanitize(str) { return str; }) — this way your code still runs
  - js standard string funcs coming up again: str.reverse() is a function you can use to reverse the string. I might tell you not to use that but you should at least float the idea. There are a handful of these funcs that would be helpful to memorize (string: charAt, reverse, (last)indexOf, replace(All)...array: map(), filter(), some(), forEach(), sort()...object: Object.keys/entries/values)
  - the if (xx) return true; else return false can be simplified to just return xx
  */
