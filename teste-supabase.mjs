// Usamos 'import' em vez de 'require'
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Executamos a configuração do dotenv
dotenv.config();

// O resto do código é praticamente o mesmo
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log("--- Iniciando Teste de Conexão Direta com Supabase (ESM) ---");
console.log("URL lida do .env:", supabaseUrl ? "Encontrada" : "FALHOU EM LER");
console.log("Chave lida do .env:", supabaseAnonKey ? "Encontrada" : "FALHOU EM LER");

async function testarConexao() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("\n[ERRO FATAL] As variáveis no arquivo .env não foram carregadas.");
    return;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log("\nCliente Supabase criado. Buscando dados...");

    const { data, error } = await supabase
      .from('view_disponibilidades_recente_order')
      .select('farmacia, produto, estoque')
      .limit(1);

    if (error) {
      console.error("\n[ERRO NA QUERY] Falha ao buscar dados:", error.message);
      return;
    }

    console.log("\n[SUCESSO!] Conexão e busca realizadas!");
    console.log("Dados recebidos:", data);

  } catch (e) {
    console.error("\n[ERRO INESPERADO]", e.message);
  } finally {
    console.log("\n--- Teste finalizado ---");
  }
}

testarConexao();
