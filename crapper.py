import os

def changeFileName(root_path):
    files = os.listdir(root_path)
    for f in files:
        if '.json' not in f and '.md' not in f and '.jpg' not in f and '.png' not in f:
            changeFileName(os.path.join(root_path, f))
        else:
            if '.json' in f or '.jpg' in f or '.png' in f:
                continue

            old_f = f
            new_f = f.split('_')
            if len(new_f) != 1:
                print('脚本对 {} 的名称进行修改 -> {}'.format(os.path.join(root_path, old_f), '-'.join(new_f)))
                new_f = '-'.join(new_f)
                abs_path = os.path.join(root_path, old_f)
                os.rename(abs_path, os.path.join(root_path, new_f))

changeFileName('docs')
changeFileName('download')
changeFileName('versioned_docs')


