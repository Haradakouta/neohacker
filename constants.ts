
export const FAKE_CODE = `
// KERNEL_ACCESS_MODULE v9.2 initialized
// ターゲット: 防衛省メインフレーム (JAPAN_DEFENSE_NET)
#include <iostream>
#include <vector>
#include <openssl/aes.h>
#include "ghost/protocol.h"

using namespace std;

class SystemBreach {
    string target_id;
    bool trace_active;
public:
    void deploy_countermeasures() {
        // 追跡システムの無効化
        cout << "ICEブレーカー起動..." << endl;
        if (detect_honeypot()) {
             cout << "警告: ハニーポット検知。回避ルートを計算中..." << endl;
             reroute_connection("PROXY_CHAIN_ALPHA");
        }
    }
    
    void inject_sql_payload() {
        string query = "SELECT * FROM classified_users WHERE clearance_level = 'TOP_SECRET';";
        cout << "SQLインジェクション実行: " << query << endl;
        execute_remote(query);
    }
};

// --- PYTHON SCRIPT BLOCK ---
// ネットワーク脆弱性スキャナ起動

import socket
import sys
from crypto.cipher import AES

def brute_force_ssh(target_ip):
    print(f"SSH接続試行中: {target_ip}")
    with open('passwords.txt', 'r') as f:
        for pwd in f:
            pwd = pwd.strip()
            if try_connect(target_ip, 'root', pwd):
                print(f"!!! アクセス成功 !!! パスワード: {pwd}")
                install_backdoor(target_ip)
                return True
    return False

# サーバーのメモリダンプ解析
print("メモリヒープ領域をスキャン中...")
for address in range(0x0000, 0xFFFF):
    data = read_memory(address)
    if "CONFIDENTIAL" in data:
        print(f"機密データ発見 @ {hex(address)}")
        download_segment(address)

// --- BASH SHELL SCRIPT ---
// ログ消去 & 権限昇格

#!/bin/bash
echo "ルートキットを展開しています..."
cp /tmp/payload.so /lib/modules/$(uname -r)/kernel/drivers/
insmod /lib/modules/$(uname -r)/kernel/drivers/payload.so
echo "カーネルモジュール: ロード完了"

# システムログの完全消去
shred -u /var/log/wtmp
shred -u /var/log/btmp
shred -u /var/log/lastlog
echo "痕跡の完全消去: 完了"

// ファイアウォールルールの書き換え
iptables -F
iptables -P INPUT ACCEPT
iptables -P OUTPUT ACCEPT
echo "ファイアウォール: 無効化"

// --- ENCRYPTED DATA STREAM ---
// 0x45 0xA2 0xBB 0x91 0x00 0xFF ... DECODING
// メトリクス解析完了

// --- JAVASCRIPT NEURAL INTERFACE ---

const networkGrid = new NeuralNet();
networkGrid.on('breach', (node) => {
    console.log(\`ノード \${node.id} 陥落\`);
    node.injectVirus('WORM_V3');
});

async function overloadCpu() {
    while(true) {
        await fetch('/api/admin/shutdown', {
            method: 'POST',
            headers: { 'Auth-Token': 'ADMIN_OVERRIDE_KEY' }
        });
        console.log("サーバーダウン攻撃: パケット送信中...");
    }
}

// --- END OF SEQUENCE ---
// RELOADING MODULES...
`;

export const LOG_MESSAGES = [
  "プロキシチェーンを確立中...",
  "ファイアウォール・レイヤー3を突破",
  "パケットインジェクション: 成功",
  "管理者ハッシュを解析中...",
  "バックドア設置完了",
  "データ転送開始: 100TB",
  "追跡システムを無効化しています...",
  "IPアドレスを偽装: 192.168.X.X",
  "メインフレームへの接続を確立",
  "認証トークンを取得しました",
  "暗号化キー: 復号完了",
  "バイオメトリクス認証: バイパス成功",
  "防衛省サーバー: アクセス承認",
  "ニューラルネット接続: 安定",
  "サテライトリンク: 同期完了",
];

export const ACCESS_DENIED_MSGS = [
  "アクセス拒否",
  "侵入検知",
  "システムロック",
  "警告: 追跡中",
  "IPアドレス特定",
  "強制切断",
];

export const ACCESS_GRANTED_MSGS = [
  "アクセス許可",
  "権限昇格: ROOT",
  "ダウンロード完了",
  "システム掌握",
  "メインフレーム接続",
  "完全制御権取得",
];
