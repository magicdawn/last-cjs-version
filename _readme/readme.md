<!-- AUTO_GENERATED_UNTOUCHED_FLAG -->

{% extends "layout.md" %}

{% block extra %}

## cli

```sh
$ last-cjs-version
last-cjs-version <pkg>

get last cjs version of package

位置：
  pkg  package name                                                     [字符串]

选项：
  -m, --major    major version only                       [布尔] [默认值: false]
  -h, --help     显示帮助信息                                             [布尔]
  -v, --version  显示版本号                                               [布尔]

缺少 non-option 参数：传入了 0 个, 至少需要 1 个
```

```
$ last-cjs-version execa
5.1.1

$ last-cjs-version got
11.8.3
```

{% include 'api.md' %}

{% endblock %}
