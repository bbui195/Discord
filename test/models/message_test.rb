# == Schema Information
#
# Table name: messages
#
#  id               :bigint           not null, primary key
#  body             :text             not null
#  messageable_id   :integer          not null
#  messageable_type :string           not null
#  sender_id        :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
