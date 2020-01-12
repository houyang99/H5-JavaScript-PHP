//显示公式的地方
var display = document.getElementsByClassName('display')[0];
var formula = document.getElementById('formula');
//显示结果的地方
var result = document.getElementById('result');
//AC键
var ac = document.getElementsByClassName('ac')[0];
// 括号
var parentheses = document.getElementsByClassName('parentheses')[0];
var parenthesesFlag = false;
//运算符
var btnOperat = document.querySelectorAll('.operat');
var equalSign = document.getElementsByClassName('equal_sign')[0];
var newCalc = false;
// var setNewCalc = false;
var justOpen = true;
//数字键
var btnNumber = document.querySelectorAll('input:not(.operat):not(.ac):not(.parentheses):not(.equal_sign)');

ac.onclick = btnAc;

function btnAc(){
    formula.innerHTML = '';
    result.innerHTML = '';
}

parentheses.onclick = function(){
    if(justOpen == true){
        btnAc();
        justOpen = false;
    }
    if(newCalc == true){
        formula.innerHTML = '';
        newCalc = false;
    }
    let oldValue = formula.innerHTML;
    if(parenthesesFlag === false){
        formula.innerHTML = oldValue+'(';
        parenthesesFlag = true;
    }else{
        formula.innerHTML = oldValue+')';
        parenthesesFlag = false;
    }
    setScroll();
}
//为运算符按键添加事件
for(let thisBtnNumber of btnOperat){
    thisBtnNumber.addEventListener('click',function(){
        if(justOpen == true){
            btnAc();
            justOpen = false;
        }
        if(newCalc == true){
            formula.innerHTML = '';
            newCalc = false;
        }
        console.log(this.value);
        let oldValue = formula.innerHTML;
        formula.innerHTML = oldValue+this.value;
        setScroll();
    });
}

//为数字键添加事件
for(let thisBtnNumber of btnNumber){
    thisBtnNumber.addEventListener('click',function(){
        if(justOpen == true){
            btnAc();
            justOpen = false;
        }
        if(newCalc == true){
            formula.innerHTML = '';
            newCalc = false;
        }
        console.log(this.value);
        let oldValue = formula.innerHTML;
        formula.innerHTML = oldValue+this.value;
        setScroll();
    });
}

function setScroll(){
    var displayScrollLeft = display.scrollWidth;
    console.log('scroll');
    console.log(displayScrollLeft);
    display.scrollLeft = displayScrollLeft;
}

/**
 * 核心计算部分
 */

 equalSign.addEventListener('click',function(){
    let oldValue = formula.innerHTML;
    if(oldValue[oldValue.length-1] != '=')
        formula.innerHTML = oldValue+this.value;
    setScroll();
 });
 equalSign.addEventListener('click',calc);

 var isNight = true;
 var lightInput = document.querySelectorAll('table input');
 function toggleNight(){
    if(isNight){
        document.getElementsByClassName('calc')[0].style.background = '#fff';
        result.style.color = '#000';
        for(let thisBtn of lightInput){
            thisBtn.classList.add('light_input');
        }
        isNight = false;
    }else{
        document.getElementsByClassName('calc')[0].style.background = '#17181c';
        for(let thisBtn of lightInput){
            thisBtn.classList.remove('light_input');
        }
        isNight = true;
    }
 }

 /**
  * 计算函数
  */
 function calc(){
    var formulaStr = formula.innerHTML;
    if(formulaStr == '//1234='){
        toggleNight();
        formula.innerHTML = '';
        return;
    }
    //分解出来的数字(没有去除括号，括号在下一步来进行处理)
    var calcNumber = formulaStr.split(/[\+\-\*\/\%\=]/);
    removeSpace(calcNumber);
    //分解出来的运算符
    var calcOperators = formulaStr.split(/[0-9]/);
    removeSpace(calcOperators);
    console.log(formulaStr);
    console.log(calcNumber);
    console.log(calcOperators);
    var evalArr = new Array();
    var evalStr = '';
    for(let index in formulaStr){
        evalArr[index] = formulaStr[index];
    }
    // evalArr.splice(evalArr.length-1,1);
    console.log('删除前'+evalArr);
    removeEqual(evalArr);
    console.log('删除后'+evalArr);
    for(let index in evalArr){
        evalStr += evalArr[index];
    }
    result.innerHTML = eval(evalStr);
    newCalc = true;
    console.log(evalStr);
    console.log(eval(evalStr));
 }



 /**
  * removeSpace:去除数组里的空格
  */
 function removeSpace(arr){
     for(let index in arr){
         if(arr[index] == ''){
             arr.splice(index,1);
         }
     }
}

/**
 * 去除数组里的等于号 
 */
function removeEqual(arr){
    // for(let index in arr){
    //     if(arr[index] == '='){
    //         arr.splice(index,1);
    //         console.log('删除了一个等号');
    //     }
    // }

    for(let index=0; index<arr.length; index++){
        if(arr[index] == '='){
            arr.splice(index,1);
            index--;
        }
    }
}

/**
 * 移动端用于长按数字键5来切换白色背景和深色背景
 * 长按时长为2s
 */
// var number5 = document.getElementById('number5');
// console.log(number5);
// var timer = null;
// var isNight = true;
// var lightInput = document.querySelectorAll('table input');
// console.log(lightInput);
// number5.addEventListener('touchstart',function(){
//     console.log('长按状态');
//     timer = setTimeout(function(){
//         console.log('setTimeout');
//         if(isNight){
//             document.getElementsByClassName('calc')[0].style.background = '#fff';
//             result.style.color = '#000';
//             for(let thisBtn of lightInput){
//                 thisBtn.classList.add('light_input');
//             }
//             isNight = false;
//         }else{
//             document.getElementsByClassName('calc')[0].style.background = '#17181c';
//             for(let thisBtn of lightInput){
//                 thisBtn.classList.remove('light_input');
//             }
//             isNight = true;
//         }
//     },2000);
// });

// number5.addEventListener('touchend',function(){
//     clearTimeout(timer);
//     console.log('clearTimeout');
// });