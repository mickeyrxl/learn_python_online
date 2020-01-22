function execute_python(tid, btn) {
    var
        code = editor.getValue(),
        $button = $(btn),
        $i = $button.find('i');
    $button.attr('disabled', 'disabled');
    $.post('https://local.liaoxuefeng.com:39093/run', $.param({
        code: code
    })).done(function (r) {
        _mdShowCodeResult(btn, r.output);
    }).fail(function (r) {
        _mdShowCodeError(btn, '<p>无法连接到Python代码运行助手。请检查<a target="_blank" href="https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/001432523496782e0946b0f454549c0888d05959b99860f000">本机的设置</a>。</p>', true);
    }).always(function () {
        $i.removeClass('uk-icon-spinner');
        $i.removeClass('uk-icon-spin');
        $button.removeAttr('disabled');
    });
}
function _mdGetCode(tid) {
    return editor.getValue();
}
function encodeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
function _mdSetCodeResult(btn, result, isHtml, isError) {
    var $r = $(btn).next('div.x-code-result');
    if ($r.get(0) === undefined) {
        $(btn).after('<div class="x-code-result x-code uk-alert"></div>');
        $r = $(btn).next('div.x-code-result');
    }
    $r.removeClass('uk-alert-danger');
    if (isError) {
        $r.addClass('uk-alert-danger');
    }
    if (isHtml) {
        $r.html(result);
    } else {
        var ss = result.split('\n');
        var htm = '';
        
        var htm = _.map(ss, function (s) {
            return encodeHtml(s).replace(/ /g, '&nbsp;');
        }).join('<br>');
        
        $r.html(htm);
    }
}

function _mdShowCodeResult(btn, result, isHtml) {
    _mdSetCodeResult(btn, result, isHtml);
}

function _mdShowCodeError(btn, result, isHtml) {
    _mdSetCodeResult(btn, result, isHtml, true);
}