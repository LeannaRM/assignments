require "pry"

class AccountInfo
  def set_up_initial_values
    @tally = 0.00
    @categories = {}
  end
end


accounts = {}

account = "Sonia"

accounts[account] = AccountInfo.new
accounts[account].set_up_initial_values

binding.pry