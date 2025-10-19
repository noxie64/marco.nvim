local M = {}

function M.compile()
    local current_file = vim.fn.expand("%:p")
    local output = vim.fn.system({ "ts-node", "lib/src/main.ts", current_file })
    vim.notify(output)
end

return M
