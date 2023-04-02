const regex_1 = /\d{2,5}/g;
const string_1 = "123 1234 12345 123456";
// 贪婪匹配
console.log("regex_1", string_1.match(regex_1));

// 惰性匹配（惰性匹配，匹配到了就不往下匹配，所以其实最多只会匹配2次，不会到第5次）
const regex_2 = /\d{2,5}?/g;
const string_2 = "123 1234 12345 123456";
console.log("regex_2", string_2.match(regex_2));

// 问题：这里为啥是null
const regex_3 = /hello.*?world/g;
const string_3 = "xxxhelloworldxxhelloxxworld";
console.log("regex_3", string_2.match(regex_3));

let regex_4 = /(\d{4})([-/.])\d{2}\2\d{2}/;

const string1 = "2017-06-12";
const string2 = "2017/06/12";
const string3 = "2017.06.12";
const string4 = "2016-06/12";

console.log("regex_4", regex_4.test(string1)); // true
console.log(regex_4.test(string2)); // true
console.log(regex_4.test(string3)); // true
console.log(regex_4.test(string4)); // false

// 问题：怎么和预想效果不一样
// 1.trim去除所有空格
const trim1 = (str) => {
  return str.replace(/^\s*(.*?)\s*$/, "$1");
};
// 2.trim去除首尾空格
const trim2 = (str) => {
  return str.replace(/^\s*|\s*$/g, "");
};
console.log("trim1", trim1("  a d  c ff  "));
console.log("trim2", trim2("  a d  c ff  "));

const regex_5 = /good|bye/g;
const string_5 = "goodbye";
console.log(string_5.match(regex_5));

const regex_6 = /id=".*?"/;
const string_6 = '<div id="container" class="main"></div>';
console.log("regex_6", string_6.match(regex_6));
// 因为涉及到回溯，所以regex_7比regex_6的效率更高
const regex_7 = /id="[^"]*"/;
const string_7 = '<div id="container" class="main"></div>';
console.log("regex_7", string_7.match(regex_7));

const regex_8 = "hello".replace(/\b/g, "#");
console.log("regex_8", regex_8);
const regex_9 = "hello".replace(/\B/g, "#");
console.log("regex_9", regex_9);

// 神奇的\b，\b 是单词边界，具体就是 \w 与 \W 之间的位置，也包括 \w 与 ^ 之间的位置，和 \w 与 $ 之间的位置
var result_9 = "[JS] Lesson_01.mp4".replace(/\b/g, "#");
console.log("result_9", result_9);
var result_10 = "[JS] Lesson_01.mp4".replace(/\B/g, "#");
console.log("result_10", result_10);

// 正向先行断言?= 负向先行断言?! 正向后行断言?<= 负向后行断言?<!

var regex_10 = /(\d{4})-(\d{2})-(\d{2})/;
var string_10 = "7--2017-06-12";
console.log("regex_10", string_10.match(regex_10));

var regex_11 = /(\d{4})-(\d{2})-(\d{2})/;
var string_11 = "2017-06-12";
console.log("regex_11", regex_11.test(string_11));
console.log(RegExp.$1); // "201"
console.log(RegExp.$2); // "06"
console.log(RegExp.$3); // "12"

/**
 * 看exec和match的区别
 * RegExp方法只有2个 exec test 写法都是reg.xx(str)，
 * 其余 match matchAll search replace split都是string的原型方法，写法都是str.xx(reg)
 */
console.log("exec和match的区别", /d(b+)d/g.exec("cdbbdbsbz"));
console.log("cdbbdbsbz".match(/d(b+)d/g));

var regex_12 = /\d{4}(-|\/|\.)\d{2}(-|\/|\.)\d{2}/;
console.log(regex_12.test("2023-03/16")); // 显然这不是我们想要的

var regex_13 = /\d{4}(-|\/|\.)\d{2}\1\d{2}/;
console.log(regex_13.test("2023-03/16")); // 这样就可以保证前后分隔符一致
console.log(regex_13.test("2023-03-16"));

console.log("[-abcd]", /[-abcd]/.exec("non-profit"));
console.log("[-abcd]", /[-abcd]/.exec("anon-profit"));
const obj = "web-doc".match(/-(?<customName>\w)/).groups;
console.log("具名捕获组", obj.customName);

// 首先，如果是捕获组一定有小括号，然后分为，捕获组(x) 具名捕获组(?<Name>x) 非捕获组(?:x)
var regex_14 = /(\d)+ \1/;
console.log(regex_14.test("12345 1")); // false
console.log(regex_14.test("12345 5")); // true
console.log("分组后面有量词的话，分组最终捕获到的数据是最后一次的匹配");

console.log("|的作用是什么", /^green|red$/.exec("green red applered"));

console.log(
  "去除前后空格",
  "     green red applered     ".replace(/^\s+|\s+$/, "111111")
);

console.log("a|b", /a|b/.exec("acb")); // a b
console.log("[ab]", /[ab]/.exec("acb")); // a

console.log("a|b", "acb".replace(/a|b/, 7777)); // a b
console.log("[ab]", "acb".replace(/[ab]/, 7777)); // a

function camelize(str) {
  return str.replace(/[-_\s]+(.)?/g, function (match, a) {
    console.log("replace的第二个参数为函数时", match, a);
    return a ? a.toUpperCase() : "";
  });
}
console.log("大驼峰", camelize("-moz-transform"));

function camelize_2(str) {
  return str.replace(/[-_\s]+(.)?/g, function (match, a, b, c, d, e) {
    console.log("replace的第二个参数为函数时", match, a, b, c, d, e);
    return a ? a.toUpperCase() : "";
  });
}
console.log("大驼峰", camelize_2("----moz----transform--duration-second"));

var regex_14 = /<([^>]+)>[\d\D]*<\/\1>/; // 问题：这里\d\D和.*表示同一个意思吗
var string_14 = "<title>regular expression</title>";
var string_15 = "<p>laoyao bye bye</p>";
var string_16 = "<title>wrong!</p>";
console.log("正则匹配标签", regex_14.test(string_14)); // true
console.log("正则匹配标签", regex_14.test(string_15)); // true
console.log("正则匹配标签", regex_14.test(string_16)); // false

var regex_17 = /".*"/;
var string_17 = '"abc"de';
console.log("此正则表达式会造成回溯", string_17.match(regex_17));
var regex_18 = /"[^"]*"/;
var string_18 = '"abc"de';
console.log("修改后避免回溯", string_18.match(regex_18));

console.log("造成回溯的原因一般都是贪婪量词");
console.log("分支也是惰性的", "candy".match(/can|candy/));
console.log("分支也是惰性的", "candy".match(/candy|can/));
console.log("加了非捕获?:", "candy".match(/(?:can|candy)/)); // 问题：看不懂
console.log("加了非捕获?:", "candy".match(/^(?:can|candy)$/));

// 从这里开始，要重新更新
console.log("原来match和exec返回的结构一模一样，只是调用方法刚好反过来而已");
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
console.log(regex.exec(string));

var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
console.log(string.match(regex));

var string = "2017.06.27";
var regex1 = /\b(\d+)\b/;
var regex2 = /\b(\d+)\b/g;
console.log(string.match(regex1));
console.log(string.match(regex2));
// => ["2017", "2017", index: 0, input: "2017.06.27"]
// => ["2017", "06", "27"]

var string = "2017.06.27";
var regex1 = /\b(\d+)\b/;
var regex2 = /\b(\d+)\b/g;
console.log(string.match(regex1));
console.log(string.match(regex2));
// => ["2017", "2017", index: 0, input: "2017.06.27"]
// => ["2017", "06", "27"]

var string = "2017.06.27";
var regex2 = /\b(\d+)\b/g;
console.log(regex2.exec(string));

console.log("从上述代码看出，在使用 exec 时，经常需要配合使用 while 循环：");
var string = "2017.06.27";
var regex2 = /\b(\d+)\b/g;
var result;
while ((result = regex2.exec(string))) {
  console.log(result, regex2.lastIndex);
}
// => ["2017", "2017", index: 0, input: "2017.06.27"] 4
// => ["06", "06", index: 5, input: "2017.06.27"] 7
// => ["27", "27", index: 8, input: "2017.06.27"] 10

// const pageUrl =
//   "https://test-ldm-3mfront.xdp8.cn/activity?token=#{tokenValue}&tenantId=#{tenantIdValue}&userId=#{userIdValue}";
// const [, url, paramsStr] = pageUrl.match(/(.*)\?(.*)/);
// const paramsArray = paramsStr.split("&");
// const params = {};
// paramsArray.forEach((i) => {
//   const [, key, value] = i.match(/(\w+)=#\{(\w+)\}/);
//   params[key] = value;
// });
// console.log("配置的路径上的参数对象为", { params });

// const pageUrl = "https://test-ldm-3mfront.xdp8.cn/activity?token=#{tokenValue}";
// const [, url, token] = pageUrl.match(/(.*\?token=)#\{(.*)\}/);
// const realUrl = `${url}99999`;
// console.log({ url }, { token }, { realUrl });

// const url = "https://test-ldm-3mfront.xdp8.cn/activity?token=#{tokenValue}";
// const [, partUrl] = url.match(/(.*\?token=)#\{.*\}/);
// const tokenValue = 99999999;
// const realUrl = `${partUrl}${tokenValue}`;
// console.log({ realUrl });

const url =
  "https://test-ldm-3mfront.xdp8.cn/activity?token=#{tokenValue}&a=11";
const tokenValue = 9999999;
url.replace(/(.*\?token=)#\{.*\}(.*)/, (match, $1, $2) => {
  return `${$1}${tokenValue}${$2}`;
});
