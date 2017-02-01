#This test will check to make sure every combination of rock, paper, and scissors has the correct winner.

require_relative "./functions.rb"

def test_equality(expected, actual)
  if expected == actual
    puts "pass"
  else 
    puts "fail"
  end
end

choices = ["rock", "paper", "scissors"]
w = ["P1 wins!", "P2 wins!", "Tie!"]
expected = [w[2],w[1],w[0],w[0],w[2],w[1],w[1],w[0],w[2]]
count = 0
choices.each do |i|
  choices.each do |j|
    actual = determineWinner(i,j)
    test_equality(expected[count],actual)
    count+=1
  end
end