function eval() {
  // Do not use eval!!!
  return;
}

const priority = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
};

// const expr = ' 91 + 18 / (  42 + 62 + 84 * 95  ) + 30 ';
// const result = 121.0022;

// expressionCalculator(expr);

function expressionCalculator(expr) {
  checkUnpairedBrackets(expr);

  let stackNum = [];
  let stackOper = [];

  let arrExpr = getArrayExpression(expr);

  // console.log('SOURCE:', arrExpr.join(''), arrExpr.length);
  // console.log('***************************************************************');

  for (let i = 0; i < arrExpr.length; i++) {
    if (!isNaN(arrExpr[i])) {
      stackNum.push(arrExpr[i]);
    } else {
      if (arrExpr[i] === ')') {
        while (stackOper[stackOper.length - 1] !== '(') {
          stackNum.push(calculate(stackNum.pop(), stackNum.pop(), stackOper.pop()));
        }

        stackOper.pop();
      }

      if (priority[arrExpr[i]] <= priority[stackOper[stackOper.length - 1]]) {
        while (priority[arrExpr[i]] <= priority[stackOper[stackOper.length - 1]]) {
          stackNum.push(calculate(stackNum.pop(), stackNum.pop(), stackOper.pop()));
        }
      }

      if (arrExpr[i] !== ')') {
        stackOper.push(arrExpr[i]);
      }
    }
  }

  if (stackOper[stackOper.length - 1] === '(') {
    stackOper.pop();
  }

  // checking
  // console.log('0 test end', stackOper[stackOper.length - 1], stackNum, stackOper);

  while (stackNum.length !== 1) {
    // checking
    // console.log('1 test end', stackOper[stackOper.length - 1], stackNum, stackOper);

    stackNum.push(calculate(stackNum.pop(), stackNum.pop(), stackOper.pop()));

    // checking
    // console.log('2 test end', stackOper[stackOper.length - 1], stackNum, stackOper);

    if (stackOper[stackOper.length - 1] === '(') {
      stackOper.pop();
    }
  }

  // checking
  // console.log('***************************************************************');
  // console.log('result value:', +stackNum[0].toFixed(4), +stackNum[0].toFixed(4) === result, result);
  // console.log('result data:', stackNum, stackOper);

  return +stackNum[0].toFixed(4);
}

// ---------------------------------------------------------
function checkUnpairedBrackets(expr) {
  const leftBr = expr.match(/[(]/g);
  const rightBr = expr.match(/[)]/g);

  if (leftBr === null && rightBr === null) {
    return true;
  }

  if (leftBr === null || rightBr === null || leftBr.length !== rightBr.length) {
    throw new Error('ExpressionError: Brackets must be paired');
  }
}

function checkForCalculate(arrExpr, stackOper, i) {
  const isExistNextEl = !arrExpr[i + 1];
  const isStackElPriority = priority[arrExpr[i + 1]] <= priority[stackOper[stackOper.length - 1]];

  return isExistNextEl || isStackElPriority;
}

function calculate(a, b, oper) {
  const mathOperation = {
    '+': (a, b) => a + b,
    '-': (a, b) => b - a,
    '*': (a, b) => a * b,
    '/': (a, b) => {
      if (a === 0) {
        throw new Error('TypeError: Division by zero.');
      } else {
        return b / a;
      }
    },
  };

  return mathOperation[oper](a, b);
}

function truncateExpr(str, el) {
  return str.slice(String(el).length);
}

function extractElement(str) {
  return !isNaN(str[0]) ? parseInt(str) : str[0];
}

function getArrayExpression(expr) {
  let modExpr = expr.replace(/\s/g, '');
  let el;
  let array = [];

  do {
    el = extractElement(modExpr);
    modExpr = truncateExpr(modExpr, el);

    array.push(el);
  } while (modExpr.length !== 0);

  return array;
}

module.exports = {
  expressionCalculator,
};
