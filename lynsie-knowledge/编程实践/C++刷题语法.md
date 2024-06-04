字符串排序：
```C++
// sort 会改变原数组
string tmp = str;  
sort(tmp.begin(), tmp.end());
```
数组变set：
```C++
// 只能逐个插入
unordered_set<int> num_set;
for (const int& num : nums) {
    num_set.insert(num);
}
```
寻找元素是否在容器：
```C++
if (!num_set.count(it - 1))
```